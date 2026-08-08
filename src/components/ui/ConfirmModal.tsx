"use client";

import React, { useEffect } from "react";
import Button from "./Button";
import { Icon } from "@/components/ui/Icons";

interface ConfirmModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    confirmLabel: string;
    cancelLabel?: string;
    onConfirm: () => void;
    onCancel: () => void;
    variant?: "danger" | "warning" | "primary";
    isLoading?: boolean;
}

export default function ConfirmModal({
    isOpen,
    title,
    message,
    confirmLabel,
    cancelLabel = "Cancel",
    onConfirm,
    onCancel,
    variant = "primary",
    isLoading = false,
}: ConfirmModalProps) {
    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const getIcon = () => {
        switch (variant) {
            case "danger":
                return "error";
            case "warning":
                return "warning";
            default:
                return "help";
        }
    };

    const getIconColor = () => {
        switch (variant) {
            case "danger":
                return "text-red-600 bg-red-100";
            case "warning":
                return "text-amber-600 bg-amber-100";
            default:
                return "text-primary bg-primary/10";
        }
    };

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-200"
                role="dialog"
                aria-modal="true"
            >
                <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getIconColor()}`}>
                            <Icon name={getIcon() as any} className="text-2xl" />
                        </div>
                        <h2 className="text-xl font-black text-text-primary dark:text-white">{title}</h2>
                    </div>
                    <p className="text-text-secondary dark:text-gray-400 leading-relaxed font-medium">
                        {message}
                    </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900/50 p-6 flex flex-col sm:flex-row-reverse gap-3">
                    <Button
                        variant="primary"
                        className={
                            variant === "danger"
                                ? "bg-red-600 hover:bg-red-700 text-white border-none"
                                : variant === "warning"
                                    ? "bg-amber-600 hover:bg-amber-700 text-white border-none"
                                    : ""
                        }
                        onClick={onConfirm}
                        isLoading={isLoading}
                    >
                        {confirmLabel}
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={onCancel}
                        disabled={isLoading}
                    >
                        {cancelLabel}
                    </Button>
                </div>
            </div>
        </div>
    );
}
