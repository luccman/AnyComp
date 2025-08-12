import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://gusampbmwrpmgzcgfxmb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1c2FtcGJtd3JwbWd6Y2dmeG1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5MzU2OTIsImV4cCI6MjA3MDUxMTY5Mn0.Zf_rttbNQQGkpXNYNu4P8LkoqYaTSQhQ8NO4Gw5pmFI';
const supabase = createClient(supabaseUrl, supabaseKey);


// Stable, permanent corporate/business service images (Pexels)
const mainImages = [
  "https://images.pexels.com/photos/3183186/pexels-photo-3183186.jpeg",
  "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
  "https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg",
  "https://images.pexels.com/photos/3184466/pexels-photo-3184466.jpeg",
  "https://images.pexels.com/photos/3184632/pexels-photo-3184632.jpeg",
  "https://images.pexels.com/photos/3184454/pexels-photo-3184454.jpeg",
  "https://images.pexels.com/photos/3182759/pexels-photo-3182759.jpeg",
  "https://images.pexels.com/photos/3184463/pexels-photo-3184463.jpeg",
  "https://images.pexels.com/photos/3184302/pexels-photo-3184302.jpeg",
  "https://images.pexels.com/photos/3182822/pexels-photo-3182822.jpeg",
  "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg",
  "https://images.pexels.com/photos/3184403/pexels-photo-3184403.jpeg",
  "https://images.pexels.com/photos/3184362/pexels-photo-3184362.jpeg",
  "https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg",
  "https://images.pexels.com/photos/3184294/pexels-photo-3184294.jpeg",
  "https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg",
  "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg",
  "https://images.pexels.com/photos/3184455/pexels-photo-3184455.jpeg",
  "https://images.pexels.com/photos/3184485/pexels-photo-3184485.jpeg",
  "https://images.pexels.com/photos/3184422/pexels-photo-3184422.jpeg",
];

// Clean, modern office/meeting/desk stock photos (Pexels)
const secondaryImages = [
  "https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg",
  "https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg",
  "https://images.pexels.com/photos/3184633/pexels-photo-3184633.jpeg",
  "https://images.pexels.com/photos/3184634/pexels-photo-3184634.jpeg",
  "https://images.pexels.com/photos/3182763/pexels-photo-3182763.jpeg",
  "https://images.pexels.com/photos/3182787/pexels-photo-3182787.jpeg",
  "https://images.pexels.com/photos/3184637/pexels-photo-3184637.jpeg",
  "https://images.pexels.com/photos/3184642/pexels-photo-3184642.jpeg",
  "https://images.pexels.com/photos/3182782/pexels-photo-3182782.jpeg",
  "https://images.pexels.com/photos/3182755/pexels-photo-3182755.jpeg",
  "https://images.pexels.com/photos/3182775/pexels-photo-3182775.jpeg",
  "https://images.pexels.com/photos/3182796/pexels-photo-3182796.jpeg",
  "https://images.pexels.com/photos/3182820/pexels-photo-3182820.jpeg",
  "https://images.pexels.com/photos/3182832/pexels-photo-3182832.jpeg",
  "https://images.pexels.com/photos/3182851/pexels-photo-3182851.jpeg",
  "https://images.pexels.com/photos/3182880/pexels-photo-3182880.jpeg",
  "https://images.pexels.com/photos/3182924/pexels-photo-3182924.jpeg",
  "https://images.pexels.com/photos/3182951/pexels-photo-3182951.jpeg",
  "https://images.pexels.com/photos/3182962/pexels-photo-3182962.jpeg",
  "https://images.pexels.com/photos/3182970/pexels-photo-3182970.jpeg",
];

// Professional-looking secretary avatars (Generated Photos + DiceBear)
const secretaryAvatars = [
  "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=sophia",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=oliver",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=noah",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=ava",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=liam",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=charlotte",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=lucas",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=isabella",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=ethan",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=amelia",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=jackson",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=harper",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=benjamin",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=ella",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=henry",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=scarlett",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=william",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=aria",
];



function getRandom(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function updateImages() {
  const { data: services, error } = await supabase.from("services").select("id");

  if (error) {
    console.error("Error fetching services:", error);
    return;
  }

  for (const service of services) {
    const updated = {
      image_main_url: getRandom(mainImages),
      image_secondary_urls: [getRandom(secondaryImages), getRandom(secondaryImages)],
      secretary_avatar_url: getRandom(secretaryAvatars),
    };

    const { error: updateError } = await supabase
      .from("services")
      .update(updated)
      .eq("id", service.id);

    if (updateError) {
      console.error(`Failed to update ${service.id}`, updateError);
    } else {
      console.log(`Updated service ${service.id}`);
    }
  }
}

updateImages();
