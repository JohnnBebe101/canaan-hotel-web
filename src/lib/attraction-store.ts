import { Attraction } from "./models";
import { getAllAttractions, saveAttraction, updateAttraction as dbUpdateAttraction, deleteAttraction as dbDeleteAttraction } from "./persistence/dbAdapter";
import { logInfo, logError } from "./logger";

// Attraction Management Core: Operational attraction management
// NO IN-MEMORY FALLBACK: Using database persistence as primary source

export async function getAttractions(): Promise<Attraction[]> {
    try {
        const attractions = await getAllAttractions();
        return attractions as Attraction[];
    } catch (error) {
        logError("ATTRACTION_FETCH_FAILED", "Failed to retrieve attractions from database", { error });
        return [];
    }
}

export async function createAttraction(data: Omit<Attraction, "id">): Promise<Attraction> {
    const newAttraction: Attraction = {
        ...data,
        id: crypto.randomUUID(),
    };

    try {
        await saveAttraction(newAttraction);
        logInfo("ATTRACTION_CREATED", `New attraction created and persisted: ${newAttraction.id}`, { attractionId: newAttraction.id });
    } catch (error) {
        logError("ATTRACTION_CREATE_FAILED", "Failed to persist new attraction", { error });
        throw new Error("Failed to create attraction in database");
    }

    return newAttraction;
}

export async function updateAttraction(
    id: string,
    data: Partial<Omit<Attraction, "id">>
): Promise<Attraction | null> {
    try {
        const updated = await dbUpdateAttraction(id, data);
        if (updated) {
            logInfo("ATTRACTION_UPDATED", `Attraction updated and persisted: ${id}`, { attractionId: id });
        }
        return updated as Attraction | null;
    } catch (error) {
        logError("ATTRACTION_UPDATE_FAILED", `Failed to update attraction: ${id}`, { error });
        throw new Error("Failed to update attraction in database");
    }
}

export async function deleteAttraction(id: string): Promise<boolean> {
    try {
        const success = await dbDeleteAttraction(id);
        if (success) {
            logInfo("ATTRACTION_DELETED", `Attraction deleted and persisted: ${id}`, { attractionId: id });
        }
        return success;
    } catch (error) {
        logError("ATTRACTION_DELETE_FAILED", `Failed to delete attraction: ${id}`, { error });
        return false;
    }
}
