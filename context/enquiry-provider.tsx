"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";

import { SITE } from "@/constants/site";

import type { EnquiryContextValue, EnquiryItem, Product } from "@/types";

const EnquiryContext = createContext<EnquiryContextValue | null>(null);

const listeners = new Set<() => void>();
let cachedItems: EnquiryItem[] | null = null;
const serverSnapshot: EnquiryItem[] = [];

function readStoredItems(): EnquiryItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(SITE.enquiry.storageKey);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as EnquiryItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function getSnapshot(): EnquiryItem[] {
  if (cachedItems === null) {
    cachedItems = readStoredItems();
  }

  return cachedItems;
}

function getServerSnapshot(): EnquiryItem[] {
  return serverSnapshot;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function writeItems(items: EnquiryItem[]) {
  cachedItems = items;

  if (typeof window !== "undefined") {
    window.localStorage.setItem(SITE.enquiry.storageKey, JSON.stringify(items));
  }

  listeners.forEach((listener) => listener());
}

export function EnquiryProvider({ children }: { children: React.ReactNode }) {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const isSelected = useCallback(
    (productSlug: string) => items.some((item) => item.productSlug === productSlug),
    [items],
  );

  const addProduct = useCallback((product: Product, collectionTitle: string) => {
    const current = getSnapshot();

    if (current.some((item) => item.productSlug === product.slug) || current.length >= SITE.enquiry.maxItems) {
      return;
    }

    writeItems([
      ...current,
      {
        productSlug: product.slug,
        sku: product.sku,
        title: product.title,
        imageSrc: product.image.src,
        collectionTitle,
        addedAt: Date.now(),
      },
    ]);
  }, []);

  const removeProduct = useCallback((productSlug: string) => {
    writeItems(getSnapshot().filter((item) => item.productSlug !== productSlug));
  }, []);

  const clearAll = useCallback(() => {
    writeItems([]);
  }, []);

  const value = useMemo(
    () => ({
      items,
      count: items.length,
      isSelected,
      addProduct,
      removeProduct,
      clearAll,
    }),
    [items, isSelected, addProduct, removeProduct, clearAll],
  );

  return <EnquiryContext.Provider value={value}>{children}</EnquiryContext.Provider>;
}

export function useEnquiry() {
  const context = useContext(EnquiryContext);

  if (!context) {
    throw new Error("useEnquiry must be used within EnquiryProvider");
  }

  return context;
}
