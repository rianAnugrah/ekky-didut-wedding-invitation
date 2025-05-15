/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { createClient } from '@supabase/supabase-js';

// Update the interface for Supabase
export interface Guest {
  id: string;
  NAMA: string;
  "PHONE NUMBER"?: string;
  "JUMLAH ORANG"?: number;
  "WILL ATTEND"?: number;
  GEREJA?: boolean;
  "TEA PAI"?: boolean;
  SOIREE?: boolean;
  "AFTER PARTY"?: boolean;
  createdTime?: string;
}

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL or key is missing in environment variables");
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Enhanced error handler for Supabase operations
function handleSupabaseError(operation: string, error: any): never {
  let errorMessage = `Error during ${operation}: `;
  
  if (error.code) {
    errorMessage += `Code: ${error.code}`;
  }
  
  if (error.message) {
    errorMessage += ` Message: ${error.message}`;
  }
  
  if (error.details) {
    errorMessage += ` Details: ${error.details}`;
  }
  
  if (error.hint) {
    errorMessage += ` Hint: ${error.hint}`;
  }
  
  console.error(errorMessage, error);
  throw new Error(errorMessage);
}

// Fetch all guests
export async function fetchGuests() {
  try {
    const { data, error } = await supabase
      .from('guests')
      .select('*');

    if (error) {
      handleSupabaseError('fetching guests', error);
    }

    console.log(`✅ Fetched ${data.length} guests`);
    return data as Guest[];
  } catch (error) {
    console.error("Unexpected error fetching guests:", error);
    throw new Error(`Failed to fetch guests: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Create a new guest
export async function createGuest(
  nama: string,
  phoneNumber: string,
  jumlahOrang: number,
  willAttend: number,
  gereja: boolean,
  teaPai: boolean,
  soiree: boolean,
  afterParty: boolean
) {
  try {
    if (!nama) {
      throw new Error("Guest name is required");
    }

    const { data, error } = await supabase
      .from('guests')
      .insert({
        NAMA: nama,
        "PHONE NUMBER": phoneNumber,
        "JUMLAH ORANG": jumlahOrang,
        "WILL ATTEND": willAttend,
        GEREJA: gereja,
        "TEA PAI": teaPai,
        SOIREE: soiree,
        "AFTER PARTY": afterParty,
      })
      .select()
      .single();

    if (error) {
      handleSupabaseError('creating guest', error);
    }

    console.log(`✅ Created guest: ${nama}`);
    return data as Guest;
  } catch (error) {
    console.error("Error creating guest:", error);
    throw new Error(`Failed to create guest: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Update an existing guest
export async function updateGuest(
  id: string,
  fields: {
    NAMA?: string;
    "PHONE NUMBER"?: string;
    "JUMLAH ORANG"?: number;
    "WILL ATTEND"?: number;
    GEREJA?: boolean;
    "TEA PAI"?: boolean;
    SOIREE?: boolean;
    "AFTER PARTY"?: boolean;
  }
) {
  try {
    if (!id) {
      throw new Error("Guest ID is required for updating");
    }

    const { data, error } = await supabase
      .from('guests')
      .update(fields)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      handleSupabaseError('updating guest', error);
    }

    console.log(`✅ Updated guest with ID: ${id}`);
    return data as Guest;
  } catch (error) {
    console.error("Error updating guest:", error);
    throw new Error(`Failed to update guest: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Delete a guest
export async function deleteGuest(id: string) {
  try {
    if (!id) {
      throw new Error("Guest ID is required for deletion");
    }

    const { error } = await supabase
      .from('guests')
      .delete()
      .eq('id', id);

    if (error) {
      handleSupabaseError('deleting guest', error);
    }

    console.log(`✅ Deleted guest with ID: ${id}`);
    return { success: true, message: "Guest deleted successfully" };
  } catch (error) {
    console.error("Error deleting guest:", error);
    throw new Error(`Failed to delete guest: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
