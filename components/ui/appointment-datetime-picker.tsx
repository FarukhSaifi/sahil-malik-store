"use client";

import { useMemo, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { SITE } from "@/constants/site";

import {
  addMonths,
  formatAppointmentDate,
  formatAppointmentTime,
  formatMonthYear,
  getCalendarCells,
  isDateBookable,
  isSameDay,
  parseDateInputValue,
  startOfDay,
  startOfMonth,
  toDateInputValue,
} from "@/lib/appointment-datetime";
import { cn } from "@/lib/utils";

import type { AppointmentDateTimePickerProps } from "@/types";

export function AppointmentDateTimePicker({
  preferredDate,
  preferredTime,
  dateError,
  timeError,
  onDateChange,
  onTimeChange,
  onInteract,
}: AppointmentDateTimePickerProps) {
  const today = useMemo(() => startOfDay(new Date()), []);
  const selectedDate = useMemo(() => parseDateInputValue(preferredDate), [preferredDate]);
  const [visibleMonth, setVisibleMonth] = useState(() => startOfMonth(selectedDate ?? today));

  const cells = useMemo(() => getCalendarCells(visibleMonth), [visibleMonth]);
  const canGoPrevious = addMonths(visibleMonth, -1) >= startOfMonth(today);
  const maxMonth = startOfMonth(new Date(today.getTime() + SITE.form.appointment.maxDaysAhead * 24 * 60 * 60 * 1000));
  const canGoNext = addMonths(visibleMonth, 1) <= maxMonth;

  const summary =
    preferredDate && preferredTime
      ? `${formatAppointmentDate(preferredDate)} · ${formatAppointmentTime(preferredTime)}`
      : SITE.form.appointment.pickPrompt;

  const error = dateError || timeError;

  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="label-caps text-muted">{SITE.form.labels.preferredAppointment}</p>
          <p className="mt-2 text-sm text-foreground" aria-live="polite">
            {summary}
          </p>
        </div>
      </div>

      <div
        className={cn(
          "border bg-background p-4 sm:p-5 transition-colors",
          error ? "border-destructive" : "border-border",
        )}
      >
        <div className="flex items-center justify-between gap-3">
          <p className="label-caps text-muted">{SITE.form.appointment.calendarHeading}</p>
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center border border-border text-foreground transition-colors hover:border-foreground disabled:cursor-not-allowed disabled:opacity-30"
              aria-label={SITE.form.appointment.previousMonth}
              disabled={!canGoPrevious}
              onClick={() => {
                onInteract?.();
                setVisibleMonth((current) => addMonths(current, -1));
              }}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <p className="min-w-[9.5rem] text-center text-sm font-medium tracking-wide">
              {formatMonthYear(visibleMonth)}
            </p>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center border border-border text-foreground transition-colors hover:border-foreground disabled:cursor-not-allowed disabled:opacity-30"
              aria-label={SITE.form.appointment.nextMonth}
              disabled={!canGoNext}
              onClick={() => {
                onInteract?.();
                setVisibleMonth((current) => addMonths(current, 1));
              }}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-7 gap-1">
          {SITE.form.appointment.weekdays.map((weekday) => (
            <div key={weekday} className="py-2 text-center text-[10px] uppercase tracking-[0.18em] text-muted">
              {weekday}
            </div>
          ))}

          <AnimatePresence mode="popLayout" initial={false}>
            {cells.map((cell, index) => {
              if (!cell) {
                return <div key={`empty-${visibleMonth.getMonth()}-${index}`} />;
              }

              const value = toDateInputValue(cell);
              const bookable = isDateBookable(cell, today);
              const selected = selectedDate ? isSameDay(cell, selectedDate) : false;
              const isToday = isSameDay(cell, today);

              return (
                <motion.button
                  key={value}
                  type="button"
                  layout
                  initial={{ opacity: 0.4, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  disabled={!bookable}
                  aria-pressed={selected}
                  aria-label={formatAppointmentDate(value)}
                  className={cn(
                    "relative flex h-10 items-center justify-center text-sm transition-colors",
                    bookable ? "hover:bg-foreground hover:text-background" : "cursor-not-allowed text-muted/35",
                    selected && "bg-foreground text-background",
                    !selected && isToday && bookable && "border border-foreground",
                  )}
                  onClick={() => {
                    onInteract?.();
                    onDateChange(value);
                    if (preferredTime) {
                      onTimeChange("");
                    }
                  }}
                >
                  {cell.getDate()}
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="mt-6 border-t border-border pt-5">
          <p className="label-caps text-muted">{SITE.form.appointment.timeHeading}</p>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {SITE.form.appointment.timeSlots.map((slot) => {
              const selected = preferredTime === slot;
              const enabled = Boolean(preferredDate);

              return (
                <motion.button
                  key={slot}
                  type="button"
                  whileTap={enabled ? { scale: 0.97 } : undefined}
                  disabled={!enabled}
                  aria-pressed={selected}
                  className={cn(
                    "border px-3 py-2.5 text-xs uppercase tracking-[0.16em] transition-colors",
                    !enabled && "cursor-not-allowed border-border text-muted/40",
                    enabled && !selected && "border-border text-foreground hover:border-foreground",
                    selected && "border-foreground bg-foreground text-background",
                  )}
                  onClick={() => {
                    onInteract?.();
                    onTimeChange(slot);
                  }}
                >
                  {formatAppointmentTime(slot)}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {error ? (
        <p id="preferred-appointment-error" role="alert" className="field-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}
