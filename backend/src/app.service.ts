import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class AppService {
  private supabase: SupabaseClient;

  constructor(private configService: ConfigService) {
    // This pulls your keys from the Vercel Environment Variables
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

  async addComment(name: string, message: string) {
    const { data, error } = await this.supabase
      .from('guestbook')
      .insert([{ name, message }]) // Matches the 'message' field in your Vue form
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
}