ALTER TABLE public.profiles
ADD COLUMN gender text DEFAULT 'boy',
ADD COLUMN equipped_items jsonb DEFAULT '{"hair": "hair_boy_default", "shirt": "shirt_basic_blue", "glasses": "none", "hat": "none"}',
ADD COLUMN unlocked_items text[] DEFAULT ARRAY['hair_boy_default', 'hair_girl_default', 'shirt_basic_blue', 'shirt_basic_pink']::text[];
