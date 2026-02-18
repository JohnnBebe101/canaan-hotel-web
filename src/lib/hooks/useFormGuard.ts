"use client";

import { useEffect, useCallback } from "react";

/**
 * useFormGuard Hook
 * Prevents accidental navigation when a form has unsaved changes.
 * 
 * @param isDirty - Boolean indicating if the form has unsaved changes
 * @param message - Custom message to show in the browser prompt
 */
export function useFormGuard(isDirty: boolean, message = "You have unsaved changes. Are you sure you want to leave?") {
    const handleBeforeUnload = useCallback(
        (e: BeforeUnloadEvent) => {
            if (isDirty) {
                e.preventDefault();
                e.returnValue = message;
                return message;
            }
        },
        [isDirty, message]
    );

    useEffect(() => {
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [handleBeforeUnload]);

    // Note: Modern browsers (Chrome, Safari, Firefox) don't allow custom messages anymore
    // for security reasons, but the trigger itself still works.
}
