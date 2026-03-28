"use client";

import { Drawer } from "@tavvio/ui";
import { type Payment } from "@/hooks/usePayments";
import { StatusBadge } from "./StatusBadge";
import { formatCurrency, truncateAddress } from "@/lib/utils";
import { PaymentTimeline } from "./PaymentTimeline";

interface PaymentDetailDrawerProps {
  payment?: Payment;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PaymentDetailDrawer({
  payment,
  open,
  onOpenChange,
}: PaymentDetailDrawerProps) {
  if (!payment) return null;

  const amount = Number(payment.amount);

  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
      title={`Payment ${payment.id.slice(0, 8)}...`}
      description="Transaction details and timeline"
    >
      <div className="space-y-6">
        {/* Summary */}
        <div className="space-y-4 border-b border-[var(--border)] pb-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--muted-foreground)]">Amount</span>
            <span className="font-semibold text-[var(--foreground)]">
              {formatCurrency(amount, payment.currency)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--muted-foreground)]">Status</span>
            <StatusBadge status={payment.status} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--muted-foreground)]">Created</span>
            <span className="text-sm text-[var(--foreground)]">
              {new Date(payment.createdAt).toLocaleDateString()} at{" "}
              {new Date(payment.createdAt).toLocaleTimeString()}
            </span>
          </div>
          {payment.completedAt && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--muted-foreground)]">Completed</span>
              <span className="text-sm text-[var(--foreground)]">
                {new Date(payment.completedAt).toLocaleDateString()} at{" "}
                {new Date(payment.completedAt).toLocaleTimeString()}
              </span>
            </div>
          )}
        </div>

        {/* Route */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-[var(--foreground)]">Route</h3>
          <div className="space-y-3">
            <div className="rounded-lg border border-[var(--border)] bg-[var(--secondary)]/20 p-3">
              <p className="text-xs font-medium text-[var(--muted-foreground)]">
                Source
              </p>
              <p className="mt-1 text-sm font-semibold text-[var(--foreground)]">
                {payment.sourceAsset} on {payment.sourceChain}
              </p>
              {payment.sourceAddress && (
                <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                  {truncateAddress(payment.sourceAddress)}
                </p>
              )}
              <p className="mt-1 text-sm text-[var(--foreground)]">
                {Number(payment.sourceAmount).toFixed(6)}
              </p>
            </div>

            <div className="flex justify-center">
              <div className="rounded-full bg-[var(--primary)]/20 p-2">
                <div className="text-xs font-semibold text-[var(--primary)]">
                  ↓
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-[var(--border)] bg-[var(--accent)]/20 p-3">
              <p className="text-xs font-medium text-[var(--muted-foreground)]">
                Destination
              </p>
              <p className="mt-1 text-sm font-semibold text-[var(--foreground)]">
                {payment.destAsset} on {payment.destChain}
              </p>
              <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                {truncateAddress(payment.destAddress)}
              </p>
              <p className="mt-1 text-sm text-[var(--foreground)]">
                {Number(payment.destAmount).toFixed(6)}
              </p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div>
          <h3 className="mb-4 text-sm font-semibold text-[var(--foreground)]">
            Timeline
          </h3>
          <PaymentTimeline payment={payment} />
        </div>
      </div>
    </Drawer>
  );
}
