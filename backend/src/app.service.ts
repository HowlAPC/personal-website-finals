import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class AppService {
  private supabase: SupabaseClient;

  constructor(private configService: ConfigService) {
  const url = this.configService.get<string>('SUPABASE_URL');
  const key = this.configService.get<string>('SUPABASE_KEY');
  
  if (!url || !key) {
    throw new Error('Supabase URL or Key is missing from Environment Variables');
  }
  
  this.supabase = createClient(url, key);
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
      .insert([{ name, message }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
}