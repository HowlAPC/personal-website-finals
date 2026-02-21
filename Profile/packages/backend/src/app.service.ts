import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class AppService {
  // 1. You MUST define the supabase property here
  private supabase: SupabaseClient;

  constructor(private configService: ConfigService) {
    // 2. Initialize the client using ConfigService
    this.supabase = createClient(
      this.configService.get<string>('SUPABASE_URL') || '',
      this.configService.get<string>('SUPABASE_ANON_KEY') || ''
    );
  }

  async getComments() {
    const { data, error } = await this.supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  async addComment(name: string, content: string) {
    const { data, error } = await this.supabase
      .from('guestbook')
      .insert([{ name, content }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
}