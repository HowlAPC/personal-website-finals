import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class AppService {
  // 1. Declare the property
  private supabase: SupabaseClient;

  // 2. Initialize it in the constructor
  constructor(private configService: ConfigService) {
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