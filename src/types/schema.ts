export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      claims: {
        Row: {
          combination: number
          created_at: string
          drawing_date: string
          id: number
          profile: string
        }
        Insert: {
          combination: number
          created_at?: string
          drawing_date: string
          id?: number
          profile: string
        }
        Update: {
          combination?: number
          created_at?: string
          drawing_date?: string
          id?: number
          profile?: string
        }
        Relationships: [
          {
            foreignKeyName: "claims_combination_fkey"
            columns: ["combination"]
            referencedRelation: "combinations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "claims_profile_fkey"
            columns: ["profile"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      combinations: {
        Row: {
          id: number
          lottery: string
          number_1: number
          number_2: number
          number_3: number
          number_4: number
          number_5: number
          special_number: number
        }
        Insert: {
          id?: number
          lottery: string
          number_1: number
          number_2: number
          number_3: number
          number_4: number
          number_5: number
          special_number: number
        }
        Update: {
          id?: number
          lottery?: string
          number_1?: number
          number_2?: number
          number_3?: number
          number_4?: number
          number_5?: number
          special_number?: number
        }
        Relationships: []
      }
      generations: {
        Row: {
          combination: number
          created_at: string | null
          drawing_date: string
          id: number
          profile: string | null
        }
        Insert: {
          combination: number
          created_at?: string | null
          drawing_date: string
          id?: number
          profile?: string | null
        }
        Update: {
          combination?: number
          created_at?: string | null
          drawing_date?: string
          id?: number
          profile?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "generations_combination_fkey"
            columns: ["combination"]
            referencedRelation: "combinations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "generations_profile_fkey"
            columns: ["profile"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          credits: number
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          credits?: number
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          credits?: number
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
