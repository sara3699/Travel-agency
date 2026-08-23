// GENERATED FILE -- do not edit by hand.
//
// Regenerate after every migration. With the Supabase CLI installed:
//   npx supabase gen types typescript --project-id pjyyphsleahyyuvzxyjs > lib/database.types.ts
//
// Generated 2026-08-23 from the live schema.

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      cancellation_rules: {
        Row: { days_before: number; id: string; package_id: string; refund_pct: number }
        Insert: { days_before: number; id?: string; package_id: string; refund_pct: number }
        Update: { days_before?: number; id?: string; package_id?: string; refund_pct?: number }
        Relationships: [
          {
            foreignKeyName: "cancellation_rules_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "packages"
            referencedColumns: ["id"]
          },
        ]
      }
      enquiries: {
        Row: {
          access_token: string
          archived_at: string | null
          assigned_to: string | null
          contact_email: string | null
          contact_name: string
          contact_phone: string | null
          customer_id: string | null
          first_response_at: string | null
          id: string
          locale: string
          market: string | null
          message: string | null
          package_id: string | null
          party_adults: number
          party_children: number
          preferred_departure: string | null
          received_at: string
          reference: string
          referrer: string | null
          status: Database["public"]["Enums"]["enquiry_status"]
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          access_token: string
          archived_at?: string | null
          assigned_to?: string | null
          contact_email?: string | null
          contact_name: string
          contact_phone?: string | null
          customer_id?: string | null
          first_response_at?: string | null
          id?: string
          locale?: string
          market?: string | null
          message?: string | null
          package_id?: string | null
          party_adults?: number
          party_children?: number
          preferred_departure?: string | null
          received_at?: string
          reference: string
          referrer?: string | null
          status?: Database["public"]["Enums"]["enquiry_status"]
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          access_token?: string
          archived_at?: string | null
          assigned_to?: string | null
          contact_email?: string | null
          contact_name?: string
          contact_phone?: string | null
          customer_id?: string | null
          first_response_at?: string | null
          id?: string
          locale?: string
          market?: string | null
          message?: string | null
          package_id?: string | null
          party_adults?: number
          party_children?: number
          preferred_departure?: string | null
          received_at?: string
          reference?: string
          referrer?: string | null
          status?: Database["public"]["Enums"]["enquiry_status"]
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "enquiries_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "packages"
            referencedColumns: ["id"]
          },
        ]
      }
      enquiry_events: {
        Row: {
          actor_id: string | null
          enquiry_id: string
          from_status: Database["public"]["Enums"]["enquiry_status"] | null
          id: string
          occurred_at: string
          to_status: Database["public"]["Enums"]["enquiry_status"]
        }
        Insert: {
          actor_id?: string | null
          enquiry_id: string
          from_status?: Database["public"]["Enums"]["enquiry_status"] | null
          id?: string
          occurred_at?: string
          to_status: Database["public"]["Enums"]["enquiry_status"]
        }
        Update: {
          actor_id?: string | null
          enquiry_id?: string
          from_status?: Database["public"]["Enums"]["enquiry_status"] | null
          id?: string
          occurred_at?: string
          to_status?: Database["public"]["Enums"]["enquiry_status"]
        }
        Relationships: [
          {
            foreignKeyName: "enquiry_events_enquiry_id_fkey"
            columns: ["enquiry_id"]
            isOneToOne: false
            referencedRelation: "enquiries"
            referencedColumns: ["id"]
          },
        ]
      }
      enquiry_notes: {
        Row: { author_id: string | null; body: string; created_at: string; enquiry_id: string; id: string }
        Insert: { author_id?: string | null; body: string; created_at?: string; enquiry_id: string; id?: string }
        Update: { author_id?: string | null; body?: string; created_at?: string; enquiry_id?: string; id?: string }
        Relationships: [
          {
            foreignKeyName: "enquiry_notes_enquiry_id_fkey"
            columns: ["enquiry_id"]
            isOneToOne: false
            referencedRelation: "enquiries"
            referencedColumns: ["id"]
          },
        ]
      }
      package_facets: {
        Row: {
          id: string
          key: string
          package_id: string
          state: Database["public"]["Enums"]["facet_state"]
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          id?: string
          key: string
          package_id: string
          state: Database["public"]["Enums"]["facet_state"]
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          id?: string
          key?: string
          package_id?: string
          state?: Database["public"]["Enums"]["facet_state"]
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "package_facets_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "packages"
            referencedColumns: ["id"]
          },
        ]
      }
      package_i18n: {
        Row: {
          country: string
          created_at: string
          departure_city: string
          destination: string
          destination_latin: string | null
          difference_line: string | null
          locale: string
          natively_written: boolean
          not_for: string | null
          package_id: string
          summary: string | null
          updated_at: string
        }
        Insert: {
          country: string
          created_at?: string
          departure_city: string
          destination: string
          destination_latin?: string | null
          difference_line?: string | null
          locale: string
          natively_written?: boolean
          not_for?: string | null
          package_id: string
          summary?: string | null
          updated_at?: string
        }
        Update: {
          country?: string
          created_at?: string
          departure_city?: string
          destination?: string
          destination_latin?: string | null
          difference_line?: string | null
          locale?: string
          natively_written?: boolean
          not_for?: string | null
          package_id?: string
          summary?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "package_i18n_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "packages"
            referencedColumns: ["id"]
          },
        ]
      }
      package_ledger_lines: {
        Row: {
          estimate_currency: Database["public"]["Enums"]["currency_code"] | null
          estimate_minor: number | null
          estimate_source: string | null
          id: string
          included: boolean
          key: string
          package_id: string
          position: number
        }
        Insert: {
          estimate_currency?: Database["public"]["Enums"]["currency_code"] | null
          estimate_minor?: number | null
          estimate_source?: string | null
          id?: string
          included: boolean
          key: string
          package_id: string
          position?: number
        }
        Update: {
          estimate_currency?: Database["public"]["Enums"]["currency_code"] | null
          estimate_minor?: number | null
          estimate_source?: string | null
          id?: string
          included?: boolean
          key?: string
          package_id?: string
          position?: number
        }
        Relationships: [
          {
            foreignKeyName: "package_ledger_lines_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "packages"
            referencedColumns: ["id"]
          },
        ]
      }
      packages: {
        Row: {
          board_basis: Database["public"]["Enums"]["board_basis"]
          created_at: string
          departure_iata: string
          hero_image: string | null
          hotel_tier: number
          id: string
          next_departure: string | null
          nights: number
          party_adults: number
          party_sharing: number
          price_currency: Database["public"]["Enums"]["currency_code"]
          price_minor: number
          provenance: Database["public"]["Enums"]["provenance"]
          published_at: string | null
          slug: string
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
        }
        Insert: {
          board_basis: Database["public"]["Enums"]["board_basis"]
          created_at?: string
          departure_iata: string
          hero_image?: string | null
          hotel_tier: number
          id?: string
          next_departure?: string | null
          nights: number
          party_adults?: number
          party_sharing?: number
          price_currency: Database["public"]["Enums"]["currency_code"]
          price_minor: number
          provenance: Database["public"]["Enums"]["provenance"]
          published_at?: string | null
          slug: string
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
        }
        Update: {
          board_basis?: Database["public"]["Enums"]["board_basis"]
          created_at?: string
          departure_iata?: string
          hero_image?: string | null
          hotel_tier?: number
          id?: string
          next_departure?: string | null
          nights?: number
          party_adults?: number
          party_sharing?: number
          price_currency?: Database["public"]["Enums"]["currency_code"]
          price_minor?: number
          provenance?: Database["public"]["Enums"]["provenance"]
          published_at?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          id: string
          locale: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          id: string
          locale?: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          id?: string
          locale?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          granted_at: string
          granted_by: string | null
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          granted_at?: string
          granted_by?: string | null
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          granted_at?: string
          granted_by?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      auth_role: { Args: never; Returns: string }
      currency_exponent: {
        Args: { c: Database["public"]["Enums"]["currency_code"] }
        Returns: number
      }
      custom_access_token_hook: { Args: { event: Json }; Returns: Json }
      enquiry_by_token: {
        Args: { p_token: string }
        Returns: {
          contact_name: string
          locale: string
          package_slug: string
          party_adults: number
          party_children: number
          preferred_departure: string
          received_at: string
          reference: string
          status: Database["public"]["Enums"]["enquiry_status"]
        }[]
      }
      is_admin: { Args: never; Returns: boolean }
      is_staff: { Args: never; Returns: boolean }
      package_incompleteness: { Args: { p_package_id: string }; Returns: string[] }
      package_is_published: { Args: { p_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "employee" | "customer"
      board_basis: "room_only" | "breakfast" | "half_board" | "full_board"
      content_status: "draft" | "published" | "archived"
      currency_code: "SAR" | "AED" | "KWD" | "QAR" | "BHD" | "OMR" | "EGP" | "TND" | "USD"
      enquiry_status:
        | "new"
        | "assigned"
        | "responded"
        | "quoted"
        | "won"
        | "lost"
        | "archived"
      facet_state: "green" | "amber" | "red" | "na"
      provenance:
        | "contracted"
        | "supplier_live"
        | "partner_listed"
        | "public_sample"
        | "illustrative"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">
type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<T extends keyof DefaultSchema["Tables"]> =
  DefaultSchema["Tables"][T]["Row"]
export type TablesInsert<T extends keyof DefaultSchema["Tables"]> =
  DefaultSchema["Tables"][T]["Insert"]
export type TablesUpdate<T extends keyof DefaultSchema["Tables"]> =
  DefaultSchema["Tables"][T]["Update"]
export type Enums<T extends keyof DefaultSchema["Enums"]> =
  DefaultSchema["Enums"][T]
