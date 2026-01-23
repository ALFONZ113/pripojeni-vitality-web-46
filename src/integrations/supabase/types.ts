export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      ai_blog_posts: {
        Row: {
          ai_model: string | null
          avg_time_on_page: number | null
          bounce_rate: number | null
          canonical_url: string | null
          category: string
          content: string
          created_at: string
          excerpt: string | null
          generation_time_ms: number | null
          header_image_alt: string | null
          header_image_url: string | null
          id: string
          image_prompts: Json | null
          indexed_at: string | null
          indexed_by_google: boolean | null
          indexnow_submitted_at: string | null
          internal_links_count: number | null
          meta_description: string | null
          meta_keywords: string[] | null
          meta_title: string | null
          prompt_used: string | null
          published_at: string | null
          readability_score: number | null
          research_data: Json | null
          research_date: string | null
          scheduled_for: string | null
          seo_score: number | null
          slug: string
          status: string
          submitted_to_indexnow: boolean | null
          tags: string[] | null
          target_keywords: string[] | null
          title: string
          updated_at: string
          views_count: number | null
          word_count: number | null
        }
        Insert: {
          ai_model?: string | null
          avg_time_on_page?: number | null
          bounce_rate?: number | null
          canonical_url?: string | null
          category: string
          content: string
          created_at?: string
          excerpt?: string | null
          generation_time_ms?: number | null
          header_image_alt?: string | null
          header_image_url?: string | null
          id?: string
          image_prompts?: Json | null
          indexed_at?: string | null
          indexed_by_google?: boolean | null
          indexnow_submitted_at?: string | null
          internal_links_count?: number | null
          meta_description?: string | null
          meta_keywords?: string[] | null
          meta_title?: string | null
          prompt_used?: string | null
          published_at?: string | null
          readability_score?: number | null
          research_data?: Json | null
          research_date?: string | null
          scheduled_for?: string | null
          seo_score?: number | null
          slug: string
          status?: string
          submitted_to_indexnow?: boolean | null
          tags?: string[] | null
          target_keywords?: string[] | null
          title: string
          updated_at?: string
          views_count?: number | null
          word_count?: number | null
        }
        Update: {
          ai_model?: string | null
          avg_time_on_page?: number | null
          bounce_rate?: number | null
          canonical_url?: string | null
          category?: string
          content?: string
          created_at?: string
          excerpt?: string | null
          generation_time_ms?: number | null
          header_image_alt?: string | null
          header_image_url?: string | null
          id?: string
          image_prompts?: Json | null
          indexed_at?: string | null
          indexed_by_google?: boolean | null
          indexnow_submitted_at?: string | null
          internal_links_count?: number | null
          meta_description?: string | null
          meta_keywords?: string[] | null
          meta_title?: string | null
          prompt_used?: string | null
          published_at?: string | null
          readability_score?: number | null
          research_data?: Json | null
          research_date?: string | null
          scheduled_for?: string | null
          seo_score?: number | null
          slug?: string
          status?: string
          submitted_to_indexnow?: boolean | null
          tags?: string[] | null
          target_keywords?: string[] | null
          title?: string
          updated_at?: string
          views_count?: number | null
          word_count?: number | null
        }
        Relationships: []
      }
      automation_logs: {
        Row: {
          completed_at: string | null
          created_at: string
          details: Json | null
          duration_ms: number | null
          error_message: string | null
          estimated_cost_usd: number | null
          id: string
          related_post_id: string | null
          started_at: string
          status: string
          task_type: string
          tokens_used: number | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          details?: Json | null
          duration_ms?: number | null
          error_message?: string | null
          estimated_cost_usd?: number | null
          id?: string
          related_post_id?: string | null
          started_at?: string
          status: string
          task_type: string
          tokens_used?: number | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          details?: Json | null
          duration_ms?: number | null
          error_message?: string | null
          estimated_cost_usd?: number | null
          id?: string
          related_post_id?: string | null
          started_at?: string
          status?: string
          task_type?: string
          tokens_used?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "automation_logs_related_post_id_fkey"
            columns: ["related_post_id"]
            isOneToOne: false
            referencedRelation: "ai_blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      form_submissions: {
        Row: {
          address: string | null
          admin_notes: string | null
          city: string | null
          created_at: string
          current_price: string | null
          current_provider: string | null
          email: string
          id: string
          message: string | null
          name: string
          phone: string
          property_type: string | null
          status: string
          updated_at: string
          zip: string | null
        }
        Insert: {
          address?: string | null
          admin_notes?: string | null
          city?: string | null
          created_at?: string
          current_price?: string | null
          current_provider?: string | null
          email: string
          id?: string
          message?: string | null
          name: string
          phone: string
          property_type?: string | null
          status?: string
          updated_at?: string
          zip?: string | null
        }
        Update: {
          address?: string | null
          admin_notes?: string | null
          city?: string | null
          created_at?: string
          current_price?: string | null
          current_provider?: string | null
          email?: string
          id?: string
          message?: string | null
          name?: string
          phone?: string
          property_type?: string | null
          status?: string
          updated_at?: string
          zip?: string | null
        }
        Relationships: []
      }
      seo_tracking: {
        Row: {
          clicks: number | null
          created_at: string
          ctr: number | null
          device: string | null
          difficulty_score: number | null
          id: string
          impressions: number | null
          keyword: string
          location: string | null
          position: number | null
          previous_position: number | null
          search_volume: number | null
          tracked_date: string
          url: string
        }
        Insert: {
          clicks?: number | null
          created_at?: string
          ctr?: number | null
          device?: string | null
          difficulty_score?: number | null
          id?: string
          impressions?: number | null
          keyword: string
          location?: string | null
          position?: number | null
          previous_position?: number | null
          search_volume?: number | null
          tracked_date?: string
          url: string
        }
        Update: {
          clicks?: number | null
          created_at?: string
          ctr?: number | null
          device?: string | null
          difficulty_score?: number | null
          id?: string
          impressions?: number | null
          keyword?: string
          location?: string | null
          position?: number | null
          previous_position?: number | null
          search_volume?: number | null
          tracked_date?: string
          url?: string
        }
        Relationships: []
      }
      social_posts: {
        Row: {
          created_at: string
          custom_topic: string | null
          facebook_hashtags: string | null
          facebook_image_prompt: string | null
          facebook_image_url: string | null
          facebook_text: string | null
          id: string
          instagram_hashtags: string | null
          instagram_image_prompt: string | null
          instagram_image_url: string | null
          instagram_text: string | null
          is_published: boolean
          platform: string
          post_type: string
          published_at: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          custom_topic?: string | null
          facebook_hashtags?: string | null
          facebook_image_prompt?: string | null
          facebook_image_url?: string | null
          facebook_text?: string | null
          id?: string
          instagram_hashtags?: string | null
          instagram_image_prompt?: string | null
          instagram_image_url?: string | null
          instagram_text?: string | null
          is_published?: boolean
          platform: string
          post_type: string
          published_at?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          custom_topic?: string | null
          facebook_hashtags?: string | null
          facebook_image_prompt?: string | null
          facebook_image_url?: string | null
          facebook_text?: string | null
          id?: string
          instagram_hashtags?: string | null
          instagram_image_prompt?: string | null
          instagram_image_url?: string | null
          instagram_text?: string | null
          is_published?: boolean
          platform?: string
          post_type?: string
          published_at?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      cron_job_status: {
        Row: {
          active: boolean | null
          command: string | null
          database: string | null
          jobid: number | null
          jobname: string | null
          nodename: string | null
          nodeport: number | null
          schedule: string | null
          username: string | null
        }
        Insert: {
          active?: boolean | null
          command?: string | null
          database?: string | null
          jobid?: number | null
          jobname?: string | null
          nodename?: string | null
          nodeport?: number | null
          schedule?: string | null
          username?: string | null
        }
        Update: {
          active?: boolean | null
          command?: string | null
          database?: string | null
          jobid?: number | null
          jobname?: string | null
          nodename?: string | null
          nodeport?: number | null
          schedule?: string | null
          username?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_ai_blog_stats: { Args: never; Returns: Json }
      get_top_keywords: {
        Args: { limit_count?: number }
        Returns: {
          avg_position: number
          keyword: string
          total_clicks: number
          total_impressions: number
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
