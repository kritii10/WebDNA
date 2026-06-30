"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { AlertTriangle } from "lucide-react";

import { ThemeToggle } from "@/components/common/theme-toggle";
import { PageHeader } from "@/components/common/page-header";
import { PrimaryButton } from "@/components/common/primary-button";
import { SecondaryButton } from "@/components/common/secondary-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
  ModalTrigger
} from "@/components/ui/modal";

function SettingsSection({
  title,
  description,
  children
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <Card className="border-white/10 bg-card/60">
      <CardHeader className="gap-2">
        <CardTitle>{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

function ToggleRow({
  label,
  description,
  defaultChecked = false
}: {
  label: string;
  description: string;
  defaultChecked?: boolean;
}) {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <button
      aria-pressed={checked}
      className="flex w-full items-center justify-between gap-4 rounded-2xl border border-border/60 bg-background/50 px-4 py-3 text-left transition hover:border-sky-400/24"
      onClick={() => setChecked((value) => !value)}
      type="button"
    >
      <div>
        <p className="font-medium text-foreground">{label}</p>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      <span
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
          checked ? "bg-sky-400" : "bg-white/10"
        }`}
      >
        <span
          className={`inline-block size-5 transform rounded-full bg-white transition ${
            checked ? "translate-x-5" : "translate-x-1"
          }`}
        />
      </span>
    </button>
  );
}

export function SettingsWorkspace() {
  return (
    <div className="space-y-6">
      <PageHeader
        description="Control your personal preferences, workspace defaults, and account safety settings."
        title="Settings"
      />
      <div className="grid gap-5 xl:grid-cols-2">
        <SettingsSection
          description="Update how your profile appears across shared reports and workspace activity."
          title="Profile"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              aria-label="Full name"
              className="focus-shell h-12 rounded-2xl border border-border/60 bg-background/50 px-4 text-sm outline-none"
              defaultValue="Maya Chen"
            />
            <input
              aria-label="Email address"
              className="focus-shell h-12 rounded-2xl border border-border/60 bg-background/50 px-4 text-sm outline-none"
              defaultValue="maya@webdna.ai"
            />
          </div>
        </SettingsSection>
        <SettingsSection
          description="Rotate credentials regularly and keep sign-in security tight."
          title="Password"
        >
          <div className="grid gap-4">
            <input
              aria-label="Current password"
              className="focus-shell h-12 rounded-2xl border border-border/60 bg-background/50 px-4 text-sm outline-none"
              placeholder="Current password"
              type="password"
            />
            <input
              aria-label="New password"
              className="focus-shell h-12 rounded-2xl border border-border/60 bg-background/50 px-4 text-sm outline-none"
              placeholder="New password"
              type="password"
            />
          </div>
        </SettingsSection>
        <SettingsSection
          description="Choose when WebDNA sends alerts, weekly summaries, and comment digests."
          title="Notifications"
        >
          <div className="space-y-4">
            <ToggleRow
              defaultChecked
              description="Get notified when critical website regressions are detected."
              label="Critical alerts"
            />
            <ToggleRow
              defaultChecked
              description="Receive a weekly digest of score movement and resolved issues."
              label="Weekly summaries"
            />
            <ToggleRow
              description="Bundle collaboration notifications into a single digest."
              label="Comment digests"
            />
          </div>
        </SettingsSection>
        <SettingsSection
          description="Tune the interface to match your preferred environment and workflow."
          title="Appearance"
        >
          <div className="flex items-center justify-between rounded-2xl border border-border/60 bg-background/50 px-4 py-3">
            <div>
              <p className="font-medium">Theme</p>
              <p className="text-sm text-muted-foreground">
                Switch between light, dark, and system.
              </p>
            </div>
            <ThemeToggle />
          </div>
        </SettingsSection>
        <SettingsSection
          description="Manage workspace membership, billing ownership, and default export behavior."
          title="Account"
        >
          <div className="flex flex-wrap gap-3">
            <SecondaryButton>Invite Team</SecondaryButton>
            <SecondaryButton>Manage Billing</SecondaryButton>
            <PrimaryButton>Save Changes</PrimaryButton>
          </div>
        </SettingsSection>
        <SettingsSection
          description="These actions are destructive and should be handled carefully."
          title="Danger Zone"
        >
          <div className="rounded-[1.5rem] border border-rose-500/20 bg-rose-500/8 p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 size-4 text-rose-300" />
              <div>
                <p className="font-medium text-rose-200">Archive workspace</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Remove all active crawls and revoke team access from this workspace.
                </p>
                <div className="mt-4">
                  <Modal>
                    <ModalTrigger asChild>
                      <SecondaryButton>Archive Workspace</SecondaryButton>
                    </ModalTrigger>
                    <ModalContent>
                      <ModalHeader>
                        <ModalTitle>Confirm archive</ModalTitle>
                        <ModalDescription>
                          This is a UI-only confirmation for the destructive workspace action.
                        </ModalDescription>
                      </ModalHeader>
                      <div className="flex justify-end gap-3">
                        <SecondaryButton>Cancel</SecondaryButton>
                        <PrimaryButton>Confirm Archive</PrimaryButton>
                      </div>
                    </ModalContent>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </SettingsSection>
      </div>
    </div>
  );
}
