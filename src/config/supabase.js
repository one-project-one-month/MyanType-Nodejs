import { createClient } from "@supabase/supabase-js";
import { ENV } from "./ENV";

const supabase = createClient(ENV.SUPABASE_URL, ENV.SUPABASE_KEY);

export default supabase;
