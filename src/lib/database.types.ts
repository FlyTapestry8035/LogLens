export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          github_id: string;
          email: string;
          name: string | null;
          avatar_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          github_id: string;
          email: string;
          name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          github_id?: string;
          email?: string;
          name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "";
            columns: [];
            isOneToOne: false;
            referencedRelation: "";
            referencedColumns: [];
          },
        ];
      };
      apps: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          api_key: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          api_key: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          api_key?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "apps_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      logs: {
        Row: {
          id: string;
          app_id: string;
          level: "info" | "warn" | "error";
          message: string;
          metadata: Json | null;
          timestamp: string;
        };
        Insert: {
          id?: string;
          app_id: string;
          level: "info" | "warn" | "error";
          message: string;
          metadata?: Json | null;
          timestamp?: string;
        };
        Update: {
          id?: string;
          app_id?: string;
          level?: "info" | "warn" | "error";
          message?: string;
          metadata?: Json | null;
          timestamp?: string;
        };
        Relationships: [
          {
            foreignKeyName: "logs_app_id_fkey";
            columns: ["app_id"];
            isOneToOne: false;
            referencedRelation: "apps";
            referencedColumns: ["id"];
          },
        ];
      };
      analyses: {
        Row: {
          id: string;
          app_id: string;
          summary: string;
          anomalies_detected: boolean;
          raw_response: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          app_id: string;
          summary: string;
          anomalies_detected: boolean;
          raw_response: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          app_id?: string;
          summary?: string;
          anomalies_detected?: boolean;
          raw_response?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "analyses_app_id_fkey";
            columns: ["app_id"];
            isOneToOne: false;
            referencedRelation: "apps";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
