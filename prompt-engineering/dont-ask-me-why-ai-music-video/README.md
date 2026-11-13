# DHEVS — Create an AI Cinematic Music Video: “Don’t Ask Me Why”

> A complete eight-clip Prompt Engineering lab built from the eight canonical production prompt files. The Vietnamese script in each prompt is retained for director review; the English production prompt is the copy-ready generation brief.

## Lab overview

**Project:** DUNG HOI EM VI SAO — DONGHP CINEMATIC MUSIC VIDEO  
**Master timeline:** 00:00–02:00  
**Structure:** 8 clips × 15 seconds  
**Format:** Landscape 16:9, 480p target, one output per clip  
**Production environment:** ElevenLabs Image & Video  

### What you will learn

- Turn a story idea into a timed, shot-by-shot cinematic sequence.
- Separate director-facing storyboards from copy-ready English generation prompts.
- Declare image references and Start/End Frame roles explicitly.
- Maintain character identity, wardrobe, props, location, lighting and screen direction across clips.
- Write camera direction, negative constraints and final output contracts.
- Generate one clip at a time, inspect it, approve it, and use its actual final frame as the next clip’s continuity anchor when specified.

## 1. Eight-clip story map

| Clip | Timeline | Chapter | Model specified in source prompt |
|---|---:|---|---|
| DHEVS_01 | 00:00–00:15 of the 2-minute MV | A Lonely Man In The City | Seedance 2.5 |
| DHEVS_02 | 00:15–00:30 of the 2-minute MV | The Street Remembers | Seedance 2.5 |
| DHEVS_03 | 00:30–00:45 | The Forgotten Letter | MiniMax H3 |
| DHEVS_04 | 00:45–01:00 | Golden Memories | MINIMAX H3 MAX |
| DHEVS_05 | 01:00–01:15 | Rain Of Memories | MiniMax H3 Max (preferred; select the exact label if available) |
| DHEVS_06 | 01:15–01:30 | The Last Song | MiniMax H3 Max (preferred; choose this exact label if available) |
| DHEVS_07 | 01:30–01:45 | Learning To Let Go | MiniMax H3 Max |
| DHEVS_08 | 01:45–02:00 | A New Beginning | MiniMax H3 Max preferred; record the exact model label used |

## 2. Production workflow

### Step 1 — Read the full clip brief

Read Section A (Vietnamese director-facing script) first where present. Confirm the story beat, emotional purpose, shot order and timeline before generating. Clips 03–08 use a more compact prompt format and may begin directly with frame declarations and copy-ready production instructions.

### Step 2 — Prepare the exact inputs

Use only the reference assets declared by the relevant clip. Do not assume all clips use the same input mode: DHEVS_01 is the opening clip and has no preceding-clip Start Frame; DHEVS_02 declares its predecessor’s actual final frame as Start Frame and S08 as End Frame; DHEVS_03 uses Frame Mode; DHEVS_04–08 define their own Start/End Frame contracts. Respect each source prompt’s restrictions on extra image/video references.

### Step 3 — Confirm the model and settings

The canonical prompts intentionally specify different model labels across clips. DHEVS_01–02 specify Seedance 2.5; DHEVS_03 specifies MiniMax H3; DHEVS_04 specifies MiniMax H3 Max; DHEVS_05–08 prefer MiniMax H3 Max (with fallback/recording instructions in their respective files). Use the model stated in the individual prompt and verify the exact selectable label and supported frame/reference mode in ElevenLabs before generating. Do not silently substitute a model or input mode.

### Step 4 — Generate one clip and review

Generate one output for the current clip. Review identity, glasses, hair, wardrobe, shot timing, action, props, hands, camera motion, lighting and frame continuity. Do not proceed to the next clip until the current clip is accepted. Use the acceptance checklist below as a practical review gate.

### Step 5 — Preserve actual-frame continuity

Where the prompt requires an actual final frame from an approved predecessor, extract the final decoded frame from the approved MP4. Do not substitute a planned End Frame or a design reference when the prompt explicitly calls for the actual exported-video frame. Keep fallback images clearly identified as fallbacks.

### Step 6 — Assemble in CapCut

Arrange DHEVS_01–08 in timeline order. Add the original/authorized MP3 separately in post-production. The prompts request silent generated visuals; keep generated audio off where the tool exposes that setting. Inspect the complete master for abrupt cuts, identity drift, prop discontinuity and audio sync.

## 3. Prompt engineering pattern

Across the eight clips, the production documents use a recurring set of controls:

1. **Project and technical metadata** — clip ID, title, timeline, duration, aspect ratio, resolution and model.
2. **Input/reference contract** — exact role of Start Frame, End Frame and any image references.
3. **Creative objective** — what the viewer should understand and feel.
4. **Character/continuity lock** — identity, glasses, hairstyle, wardrobe and proportions.
5. **Timed shot list** — explicit shot boundaries, actions and camera behavior.
6. **Visual direction** — lighting, color, texture, lens/depth cues and movement.
7. **Negative constraints** — prevent identity drift, unwanted characters, malformed anatomy, morphing, text and generated sound.
8. **Final output contract** — one output, target duration/format, input declarations and output filename.

## 4. Review and acceptance gate

- [ ] Clip duration and aspect ratio match the brief.
- [ ] Correct model and supported input mode were selected.
- [ ] Start Frame begins from the intended predecessor frame, when required.
- [ ] End Frame matches the specified target composition, when provided.
- [ ] DongHP’s face, rectangular glasses, short dark hair and wardrobe remain consistent whenever visible.
- [ ] No extra person, duplicate face, ghosting or unintended reflection appears.
- [ ] Hands and fingers are anatomically plausible; props do not duplicate, disappear or change identity.
- [ ] Shot actions and transitions follow the prompt’s timing and order.
- [ ] Camera movement is smooth and intentional.
- [ ] No unexpected captions, subtitles, logos, watermarks, dialogue, lip-sync, music or sound effects are present.
- [ ] Final frame is stable and suitable for the next clip’s continuity requirement.
- [ ] Approved MP4 and actual final frame are saved with clear filenames.

## 5. Canonical production prompts

Each section below contains the full canonical prompt text supplied for that clip. The preview is placed in a separately collapsible, collapsible prompt section to keep this README navigable. Use **Open raw prompt** to view or download the standalone `.md` file. The standalone files are the authoritative copy for editing and reuse.

### DHEVS_01 — A Lonely Man In The City

**Timeline:** 00:00–00:15 of the 2-minute MV  
**Model:** Seedance 2.5  
**Standalone file:** [`CLIP_01_A_LONELY_MAN_IN_THE_CITY.md`](prompts/CLIP_01_A_LONELY_MAN_IN_THE_CITY.md)  
**Open raw prompt:** [View full Markdown](prompts/CLIP_01_A_LONELY_MAN_IN_THE_CITY.md?raw=1)

<details>
<summary>Show full DHEVS_01 prompt (expand to read the complete prompt)</summary>

```text
# DUNG HOI EM VI SAO — DONGHP CINEMATIC MUSIC VIDEO

## DHEVS_01 — A LONELY MAN IN THE CITY

**Duration:** 15 seconds  
**Timeline:** 00:00–00:15 of the 2-minute MV  
**Production:** Image-to-Video using DongHP portrait / visual references; preserve the originally supplied reference set and supported input mode  
**Model:** Seedance 2.5  
**Resolution:** 480p  
**Aspect ratio:** Landscape 16:9

---

## A. KỊCH BẢN TIẾNG VIỆT — ĐỂ DUYỆT Ý ĐỒ ĐẠO DIỄN

### Ý tưởng

DHEVS_01 mở đầu câu chuyện bằng hình ảnh DongHP xuất hiện một mình giữa thành phố về đêm. Ánh đèn neon xanh, cyan và magenta bao quanh nhân vật, tạo nên một không gian đô thị hiện đại nhưng lạnh lẽo. Anh giữ vẻ bình tĩnh, trầm tư; thành phố rộng lớn và rực sáng đối lập với cảm giác cô độc của người đàn ông.

Cảnh mở đầu lần lượt mở rộng từ chân dung nhân vật ra toàn cảnh thành phố, theo bước chân anh trên con phố ướt ánh đèn, rồi trở lại khuôn hình cận 3/4 khi anh ngước nhìn lên những ánh đèn neon. Đây là điểm kết thúc có chủ đích để DHEVS_02 tiếp tục bằng khoảnh khắc anh hạ ánh mắt và bắt đầu hành trình đi sâu hơn vào thành phố.

### SHOT 01 — THE FACE IN THE NEON NIGHT (00:00–00:03.0)

- Mở bằng khuôn hình trung cận chính diện của DongHP giữa phố đêm neon.
- DongHP đứng yên, nhìn về phía trước; biểu cảm bình tĩnh, kín đáo và có chút suy tư.
- Máy quay giữ ổn định với chuyển động tiến nhẹ, rất chậm.
- Kính chữ nhật, gương mặt, kiểu tóc ngắn và áo khoác da đen phải nhất quán.
- Ánh đèn xanh và magenta tạo bokeh mềm phía sau; không biến cảnh thành một màn trình diễn hành động.

### SHOT 02 — THE CITY FROM ABOVE (00:03.0–00:06.0)

- Cắt rõ ràng sang toàn cảnh thành phố nhìn từ trên cao.
- Một con phố đô thị kéo sâu giữa các tòa nhà, hai bên là những biển đèn neon xanh, cyan, tím và hồng.
- Mặt đường ướt phản chiếu ánh sáng; có lớp sương/haze nhẹ tạo chiều sâu điện ảnh.
- DongHP chỉ là một nhân vật nhỏ trong không gian thành phố, không cần nhìn rõ mặt ở góc toàn cảnh.
- Cảnh này mở rộng thế giới của MV và nhấn mạnh sự nhỏ bé, cô độc của nhân vật giữa đô thị rộng lớn.

### SHOT 03 — WALKING ALONE (00:06.0–00:11.0)

- Cắt sang góc máy phía sau DongHP.
- Anh mặc áo khoác da đen và trang phục tối màu, bước chậm một mình trên con phố đêm.
- Camera tracking phía sau ở tầm người, giữ khoảng cách vừa phải và chuyển động mượt theo nhịp bước.
- Ánh neon phản chiếu trên mặt đường ướt; các tòa nhà, cửa hiệu và ánh đèn tạo chiều sâu phía trước.
- Ưu tiên dáng người, mái tóc và trang phục nhất quán; không cần ép nhân vật quay mặt về camera.

### SHOT 04 — LOOKING TOWARD THE NEON LIGHT (00:11.0–00:15.0)

- Cắt sang góc cận trung 3/4 hơi thấp của DongHP, trong cùng bối cảnh phố đêm.
- Anh ngước nhìn lên phía ánh sáng neon ngoài khung hình; chuyển động đầu và mắt chậm, tự nhiên.
- Ánh xanh/cyan chiếu từ một phía, dải magenta nổi bật ở nền phía sau; ánh đèn vàng ấm xuất hiện nhẹ ở xa.
- Giữ rõ khuôn mặt, kính và áo khoác da; không thay đổi danh tính hay tạo hiệu ứng biến dạng khi chuyển góc.
- Giữ bố cục cuối ổn định: DongHP nhìn lên, sẵn sàng nối sang DHEVS_02 — The Street Remembers.

### Cảm xúc và mục đích

- Giới thiệu DongHP và thế giới đô thị về đêm của MV.
- Thiết lập bảng màu neon xanh/cyan/magenta và bề mặt đường ướt phản chiếu.
- Tạo đối lập giữa thành phố rực sáng và trạng thái cô độc, trầm tư của nhân vật.
- Kết thúc bằng ánh nhìn hướng lên để DHEVS_02 có thể tiếp tục liền mạch từ khung hình cuối.

---

## B. ENGLISH PRODUCTION PROMPT — COPY INTO ELEVENLABS

# PROJECT: DUNG HOI EM VI SAO
# DONGHP — CINEMATIC MUSIC VIDEO

## DHEVS_01 — A LONELY MAN IN THE CITY

**Timeline:** 00:00–00:15 of the complete music video  
**Duration:** 15 seconds  
**Aspect Ratio:** Landscape 16:9  
**Resolution:** 480p  
**Model:** Seedance 2.5

### 1. REFERENCE IMAGE DECLARATION

Use the supplied DongHP portrait / visual reference images as the visual guidance for this opening clip. They all represent the same real adult man. Use the front-facing portrait as the main identity anchor and any supplied alternate-angle portraits only to preserve the same facial identity from different viewpoints. Do not treat the references as a collage or as different people.

Preserve the same recognizable face, natural facial proportions, short dark hairstyle, rectangular dark-framed eyeglasses, black leather jacket and dark inner shirt. Keep the neon-lit night-city appearance consistent with the supplied visual references.

DHEVS_01 is the opening segment; there is no preceding DHEVS clip from which to take a continuity Start Frame. The exact original input-slot mapping and original reference filenames for this generation are not recorded here. Use the original reference assets supplied for DHEVS_01 in the input mode supported by the selected Seedance model. Do not invent substitute filenames or add unrelated reference images.

**FINAL CONTINUITY TARGET — NOT AN INPUT START FRAME:** The final frame of the approved DHEVS_01 video was extracted and saved as `DHEVS_01_LAST_FRAME_FOR_DHEVS_02.jpg`. It shows DongHP in a three-quarter close-up, looking upward toward the neon lights. This is the continuity image for the beginning of DHEVS_02; it is the result to preserve at the end of this clip, not a frame from a preceding clip.

### 2. CREATIVE OBJECTIVE

Act as a professional cinematic music-video director and cinematographer.

Create the opening 15-second segment of the Vietnamese romantic music video **"Đừng Hỏi Em Vì Sao"**, titled **"A Lonely Man in the City"**.

Introduce DongHP alone in a neon-lit city at night. Establish the urban environment and the emotional contrast between the bright, living city and the protagonist's quiet isolation. Tell the story visually through four connected cinematic shots: an opening portrait, a high-angle city view, a rear-tracking walk, and a final three-quarter close-up of DongHP looking upward.

The final composition must lead naturally into DHEVS_02 — The Street Remembers. Do not turn the sequence into a fast action montage or an unrelated location change.

### 3. CHARACTER IDENTITY LOCK — HIGHEST PRIORITY

The protagonist is the same real adult Vietnamese man shown in the supplied DongHP references.

Preserve his recognizable facial identity, facial geometry, natural skin texture, short dark hairstyle, rectangular dark-framed eyeglasses, black leather jacket and dark inner shirt.

His glasses must remain consistent in shape, size and position whenever his face is visible. Keep his natural age, skin tone, body proportions and wardrobe unchanged throughout the sequence.

In wide city and rear-tracking shots, prioritize a consistent silhouette, hairstyle and black leather jacket. In the final close-up, preserve the three-quarter facial appearance and upward-looking gaze shown in the approved DHEVS_01 ending.

Never replace, beautify, redesign or reinterpret his face. Facial identity preservation is more important than motion complexity.

### 4. SHOT 01 — THE FACE IN THE NEON NIGHT
**00:00–00:03.0**

Open on a medium close-up of DongHP standing alone on a neon-lit city street at night. He faces forward with a calm, restrained and thoughtful expression.

Use a stable composition with a very subtle, smooth camera push-in. Keep his eyes, face and rectangular glasses sharp and recognizable. Blue and cyan light, magenta neon and a small amount of warm-amber practical light form soft, realistic bokeh in the background.

Keep the black leather jacket and dark inner shirt consistent with the supplied references. His movement is minimal and natural: quiet breathing and a small eye movement only. Do not introduce another main character or a new prop.

### 5. SHOT 02 — THE CITY FROM ABOVE
**00:03.0–00:06.0**

Make a clean editorial cut to a high-angle aerial view looking down a deep urban street at night. Tall buildings and storefronts frame the road. Neon signs and architectural lights glow in blue, cyan, violet and magenta, with restrained warm-amber highlights.

The street surface is wet and reflects the colored lights. Add subtle atmospheric haze and cinematic depth. The city should feel spacious and alive, while DongHP appears small and isolated within the environment if visible.

Keep this as a wide environmental shot. Do not force a close view of the protagonist's face. Do not morph the portrait into the aerial city; use a clean cut.

### 6. SHOT 03 — WALKING ALONE
**00:06.0–00:11.0**

Cut to a rear view of DongHP walking alone down the same neon-lit city street. He wears the same black leather jacket and dark clothing. His pace is slow, measured and natural.

Use a smooth rear tracking camera at approximately human height, following him from behind without overtaking him. Keep his body proportions, hairstyle and jacket consistent. The wet pavement reflects blue, cyan, pink and magenta lights from the surrounding buildings and storefronts.

Let the city environment and his solitary movement carry the emotion. Keep his face turned away or only partially visible; do not force a frontal portrait in this shot. Avoid sudden walking-speed changes, unnatural limb movement or camera shake.

### 7. SHOT 04 — LOOKING TOWARD THE NEON LIGHT
**00:11.0–00:15.0**

Make a clean cut to a slightly low-angle, three-quarter medium close-up of DongHP in the same nighttime city environment.

DongHP gradually raises his gaze toward a neon light above or just outside the frame. His head movement is restrained and believable; his eyes follow the light naturally. Preserve his real facial identity, rectangular glasses, short dark hairstyle, black leather jacket and dark inner shirt.

A strong blue/cyan light source glows on one side of the frame, while a vivid magenta neon strip crosses the background. A small warm-amber light may remain softly blurred in the distance. Keep the background out of focus and the face sharply detailed.

End on the stable three-quarter close-up with DongHP looking upward. Match the approved final composition represented by `DHEVS_01_LAST_FRAME_FOR_DHEVS_02.jpg` as closely as possible. Hold the final image long enough for a clean cut into DHEVS_02. Do not add a new location or dissolve into the next scene.

### 8. VISUAL STYLE AND CINEMATOGRAPHY

Create authentic 1980s-inspired retro romantic cinema using modern photorealistic cinematography.

Use:
- Neon blue and cyan as the dominant cool light sources.
- Magenta and soft pink neon accents.
- Restrained warm-amber practical lights in the distance.
- Rain-wet or recently wet reflective asphalt.
- Tall urban facades and deep street perspective.
- Subtle atmospheric haze.
- Soft optical bokeh and realistic depth of field.
- Subtle 35mm film grain and gentle highlight halation.
- Natural skin texture and realistic reflections on the leather jacket.
- Stable camera movement and natural human motion.
- A consistent night-city color grade across all four shots.

Use four distinct shots connected through clean editorial cuts:
1. Opening portrait.
2. High-angle city establishing shot.
3. Rear-tracking walk through the city.
4. Three-quarter upward-looking close-up ending on the DHEVS_01 continuity frame.

Do not morph the character's face or transform one location into another.

### 9. STRICT NEGATIVE CONSTRAINTS AND FINAL OUTPUT CONTRACT

Do not:
- Change DongHP's facial identity, facial geometry, apparent age or skin tone.
- Remove, replace, resize or distort his rectangular eyeglasses.
- Change his short dark hairstyle, black leather jacket or dark inner shirt.
- Generate duplicate faces, ghosting or unstable facial details.
- Add a detailed female character or an unnecessary second main character.
- Add random foreground people that distract from the protagonist.
- Change to a different city, daytime setting or unrelated location.
- Use facial morphing, melting transitions or dissolving transformations between shots.
- Add captions, subtitles, lyrics, titles, logos, watermarks or newly invented readable text.
- Use cartoon, anime or video-game aesthetics.
- Add dialogue, singing, lip-sync, narration, generated music or sound effects.
- Introduce exaggerated gestures, fast action, handheld shake or unnatural body movement.

The original / licensed MP3 soundtrack will be added separately during post-production. Keep this a silent visual clip.

Generate exactly ONE photorealistic video with the following specifications:

- Project ID: DHEVS_01
- Title: A Lonely Man in the City
- Duration: 15 seconds
- Timeline: 00:00–00:15 of the complete MV
- Aspect Ratio: Landscape 16:9
- Resolution: 480p
- Model: Seedance 2.5
- Reference Images: Use the original DongHP reference set supplied for DHEVS_01; do not add unrelated images
- Incoming Start Frame: None from a previous DHEVS clip; this is the opening segment
- Continuity End Frame: Stable three-quarter close-up of DongHP looking upward, matching `DHEVS_01_LAST_FRAME_FOR_DHEVS_02.jpg`
- Number of Generations: 1
- Generated Audio: Off

**Shot structure:**
- 00:00–00:03.0: Opening portrait in the neon city.
- 00:03.0–00:06.0: High-angle aerial city establishing shot.
- 00:06.0–00:11.0: Rear-tracking walk through the wet neon street.
- 00:11.0–00:15.0: Three-quarter close-up; DongHP looks upward and holds the final frame.

Preserve DongHP's identity while establishing the lonely nighttime city and building visual continuity with DHEVS_02 — The Street Remembers.

**OUTPUT FILE:**
DHEVS_01_A_LONELY_MAN_IN_THE_CITY.mp4

END OF PRODUCTION PROMPT.

---

## C. PRODUCTION RECORD AND SOURCE ACCURACY NOTE

This standardized document was reconstructed from the saved 15-second Seedance 2.5 video export for DHEVS_01, its sampled frames, the extracted hand-off image `DHEVS_01_LAST_FRAME_FOR_DHEVS_02.jpg`, and the continuity description in `DHEVS_02_PROMPT.md`.

The original text prompt submitted to ElevenLabs was not present in the available project files. Therefore, the four-shot timing and visual sequence above describe the approved exported video as observed; the English production prompt is a faithful reconstruction for documentation and repeatability, not a verbatim recovery of the original prompt text. The exact original reference filenames and input-slot mapping were also not available and are intentionally not guessed.

**Observed exported-video properties:** approximately 15.072 seconds, 24 fps, 852 × 480 pixels. The production target remains 480p landscape 16:9.
```

</details>

### DHEVS_02 — The Street Remembers

**Timeline:** 00:15–00:30 of the 2-minute MV  
**Model:** Seedance 2.5  
**Standalone file:** [`CLIP_02_THE_STREET_REMEMBERS.md`](prompts/CLIP_02_THE_STREET_REMEMBERS.md)  
**Open raw prompt:** [View full Markdown](prompts/CLIP_02_THE_STREET_REMEMBERS.md?raw=1)

<details>
<summary>Show full DHEVS_02 prompt (scroll within the code panel)</summary>

```text
# DUNG HOI EM VI SAO — DONGHP CINEMATIC MUSIC VIDEO

## DHEVS_02 — THE STREET REMEMBERS
**Duration:** 15 seconds  
**Timeline:** 00:15–00:30 of the 2-minute MV  
**Production:** Image-to-Video with Start Frame and End Frame  
**Model:** Seedance 2.5  
**Resolution:** 480p  
**Aspect ratio:** Landscape 16:9

---

## A. KỊCH BẢN TIẾNG VIỆT — ĐỂ DUYỆT Ý ĐỒ ĐẠO DIỄN

### Ý tưởng

Sau khoảnh khắc ngước nhìn ánh đèn ở cuối DHEVS_01, DongHP hạ ánh mắt và tiếp tục bước đi. Thành phố mở ra trước mắt người xem: đường phố sau mưa, mặt đường phản chiếu neon, những cửa hiệu đã vắng khách. Anh đi ngang một cửa hàng âm nhạc cũ. Ánh sáng ấm bên trong và những chiếc cassette, đĩa nhạc, cây guitar trong tủ kính gợi lên một ký ức mà anh chưa sẵn sàng đối diện.

Đây là cảnh chuyển từ “một người đàn ông trong thành phố” sang “một thành phố chứa đầy ký ức”. Không giải thích quá nhiều; chỉ gieo một dấu hiệu thị giác để khán giả tò mò về câu chuyện phía sau.

### SHOT 01 — FROM THE LOOK TO THE JOURNEY (00:00–00:02.0)

- **Start Frame:** Khung hình cuối thực tế của DHEVS_01.
- Bắt đầu đúng góc cận 3/4, DongHP đang nhìn lên.
- Anh từ từ hạ ánh mắt về phía con phố và hơi xoay vai như chuẩn bị bước tiếp.
- Chỉ giữ cận mặt trong khoảng 1–2 giây; không kéo dài cảnh chân dung.
- Cắt điện ảnh sang toàn cảnh phố, không morph khuôn mặt.

### SHOT 02 — THE EMPTY NEON STREET (00:02.0–00:09.5)

- Góc rộng từ trên cao hoặc góc phố nhìn sâu vào con đường sau mưa.
- DongHP đi một mình, quay lưng về camera; áo da đen là dấu hiệu nhận diện chính.
- Camera hạ dần về tầm đường và tracking phía sau bước chân.
- Các vũng nước phản chiếu ánh neon xanh, cyan, magenta và vàng hổ phách.
- Không khí thành phố sống động nhưng nhân vật vẫn cô độc.
- Không cần cận mặt trong phần này.

### SHOT 03 — THE MUSIC STORE MEMORY (00:09.5–00:15.0)

- Camera tracking ngang khi DongHP đi ngang một cửa hàng âm nhạc cũ.
- Qua lớp kính có thể thấy cassette, đĩa vinyl và một cây guitar trong ánh đèn vàng ấm.
- Tương phản giữa ánh sáng ấm trong cửa hàng và con phố neon lạnh bên ngoài.
- DongHP chậm bước, nhìn vào cửa kính; biểu cảm tò mò, hoài niệm nhưng tiết chế.
- Không tạo thêm người phụ nữ hoặc nhân vật phụ.
- Camera kết thúc bằng góc nghiêng toàn thân/3/4 bên, khớp bố cục ảnh S08.
- Giữ frame cuối ổn định để nối sang DHEVS_03 — The Forgotten Letter.

### Cảm xúc và mục đích

- Mở rộng thế giới MV sau cảnh mở đầu.
- Tăng cảm giác cô độc và hoài niệm.
- Đưa “âm nhạc/cassette/guitar” vào câu chuyện như một manh mối ký ức.
- Tạo cầu nối tự nhiên sang phân đoạn lá thư và quá khứ ở DHEVS_03.

---

## B. ENGLISH PRODUCTION PROMPT — COPY INTO ELEVENLABS

# PROJECT: DUNG HOI EM VI SAO
# DONGHP — CINEMATIC MUSIC VIDEO

## DHEVS_02 — THE STREET REMEMBERS

**Timeline:** 00:15–00:30 of the complete music video  
**Duration:** 15 seconds  
**Aspect Ratio:** Landscape 16:9  
**Resolution:** 480p  
**Model:** Seedance 2.5

### 1. REFERENCE IMAGE DECLARATION

Use the TWO uploaded images according to their order and assigned roles:

**IMAGE 1 — DHEVS_01 FINAL FRAME — START FRAME**

Use the first uploaded image as the exact visual starting point of DHEVS_02. It is the final frame extracted from the approved DHEVS_01 video.

Continue naturally from the man's three-quarter close-up and upward-looking gaze. Preserve the same facial identity, glasses, hairstyle, black leather jacket, dark inner shirt, neon lighting and night-city atmosphere.

Do not restart the scene with a different face, wardrobe or location.

**IMAGE 2 — S08 — END FRAME / SIDE-WALKING REFERENCE**

Use the second uploaded image as the visual target for the final composition of DHEVS_02.

It defines the side-view walking pose, black leather jacket, dark clothing, rectangular glasses, music-store window, neon cassette imagery and wet reflective pavement.

The final shot should closely match the composition and character pose of S08.

Use clean cinematic cuts between shots. Do not morph one facial pose into another.

### 2. CREATIVE OBJECTIVE

Act as a professional cinematic music-video director and cinematographer.

Create the second 15-second segment of a Vietnamese romantic heartbreak music video titled "Đừng Hỏi Em Vì Sao".

The sequence is titled "The Street Remembers".

Continue the emotional journey from DHEVS_01: after looking toward the distant neon light, DongHP lowers his gaze and walks deeper into the city.

The city should feel alive, atmospheric and full of memories, while the protagonist remains emotionally isolated.

Spend most of the runtime showing the city, street movement, reflections and music-store environment. Do not make this another long portrait shot.

### 3. CHARACTER IDENTITY LOCK — HIGHEST PRIORITY

The protagonist is the same real adult Vietnamese man shown in the uploaded references.

Preserve his recognizable facial identity, facial geometry, natural skin texture, short black hairstyle, rectangular dark-framed eyeglasses, black leather jacket and dark inner shirt.

His glasses must remain consistent in shape and position whenever his face is visible.

Keep the same outfit and natural body proportions throughout the sequence.

In wide and rear-tracking shots, prioritize consistent silhouette, hairstyle and wardrobe. Do not generate unnecessary detailed frontal facial views.

Never replace, beautify, redesign or reinterpret his face.

Facial identity preservation is more important than motion complexity.

### 4. SHOT 01 — FROM THE LOOK TO THE JOURNEY
**00:00–00:02.0**

Start from IMAGE 1 exactly.

Hold the three-quarter close-up briefly as DongHP finishes looking upward.

He slowly lowers his gaze toward the street and subtly shifts his shoulders as if preparing to walk.

Keep the face stable and the glasses correctly positioned.

At approximately 2 seconds, make a clean cinematic cut to a wide city shot.

Do not use face morphing, facial blending or a dissolving transformation.

### 5. SHOT 02 — THE EMPTY NEON STREET
**00:02.0–00:09.5**

Reveal a cinematic wide view of the same 1980s-inspired city at night, immediately after rainfall.

Show a deep urban street framed by tall buildings, closed storefronts and glowing neon lights.

Wet asphalt reflects blue, cyan, magenta, pink and restrained warm-amber light.

DongHP walks alone down the street, initially seen from behind.

His black leather jacket and dark clothing remain consistent with the previous scene.

The camera begins with a slightly elevated wide establishing composition, then smoothly lowers toward street level and follows him from behind.

Show his footsteps moving through reflections and shallow puddles. Use a steady rear tracking shot with natural walking pace.

The environment should receive most of the visual attention: wet pavement, neon reflections, distant signs, building facades and atmospheric depth.

Keep his face small, turned away or only partially visible during this shot. Do not force a frontal close-up.

The street must feel like the same continuous nighttime city established in DHEVS_01.

### 6. SHOT 03 — THE MUSIC STORE MEMORY
**00:09.5–00:15.0**

Transition into a smooth side-tracking shot as DongHP walks past an old-fashioned music store.

Through the large shop window, show carefully arranged vintage cassette tapes, vinyl records, a small stereo system and an acoustic/electric guitar displayed inside.

Warm amber light glows from the shop interior, contrasting with the cool blue and magenta neon outside.

Rain droplets and reflections remain visible on the glass and pavement.

DongHP gradually slows down and glances toward the music-store window, as if something there has awakened a distant memory.

His expression is subtle and reflective, never exaggerated.

Keep his face and rectangular glasses consistent with the references.

Do not create another person or a second face in the window reflection. The glass may reflect only the street lights and an indistinct silhouette of DongHP's jacket.

End with a stable full-body or three-quarter side-view composition closely matching IMAGE 2 / S08: DongHP beside the neon music-store window, wearing the same black leather jacket and dark outfit.

Hold the final composition briefly for a clean edit into DHEVS_03.

### 7. VISUAL STYLE AND CINEMATOGRAPHY

Authentic 1980s-inspired retro romantic cinema combined with modern photorealistic cinematography.

Use:
- Neon blue and cyan.
- Magenta and soft pink.
- Restrained warm amber inside the music store.
- Rain-soaked reflective asphalt.
- Vintage music-store details.
- Subtle 35mm film grain.
- Gentle cinematic highlight halation.
- Realistic depth of field and optical bokeh.
- Atmospheric haze.
- Smooth tracking movement.
- Natural human motion.
- Consistent cinematic color grading.

Use three distinct shots connected through clean editorial cuts:
1. Brief continuing portrait.
2. Wide/rear-tracking city sequence.
3. Side-tracking music-store sequence ending on S08.

Do not use facial morphing between shots.

### 8. STRICT NEGATIVE CONSTRAINTS

Do not:
- Change DongHP's facial identity.
- Remove, replace or distort his eyeglasses.
- Change his short black hairstyle, age or skin tone.
- Change his black leather jacket or dark inner shirt.
- Generate duplicate faces or ghosting.
- Create a detailed female character.
- Add unnecessary foreground people.
- Generate a second person in the shop-window reflection.
- Change to a different city or unrelated location.
- Add random readable text, captions, subtitles, lyrics, logos or watermarks.
- Use cartoon, anime or video-game aesthetics.
- Add dialogue, singing, lip-sync or narration.
- Generate music or sound effects.

The original MP3 soundtrack will be added separately during post-production.

### 9. FINAL OUTPUT CONTRACT

Generate exactly ONE photorealistic video with the following specifications:

- Project ID: DHEVS_02
- Title: The Street Remembers
- Duration: 15 seconds
- Timeline: 00:15–00:30 of the complete MV
- Aspect Ratio: Landscape 16:9
- Resolution: 480p
- Model: Seedance 2.5
- Start Frame: IMAGE 1 — DHEVS_01 final frame
- End Frame: IMAGE 2 — S08
- Additional Image References: None
- Number of Generations: 1
- Generated Audio: Off

Shot structure:
- 00:00–00:02.0: Continue the final close-up from DHEVS_01.
- 00:02.0–00:09.5: Wide neon street and rear-tracking sequence.
- 00:09.5–00:15.0: Side-tracking music-store sequence ending on S08.

Preserve DongHP's identity while prioritizing environmental storytelling, cinematic movement and emotional continuity.

The final frame must be stable and suitable for the opening of DHEVS_03 — The Forgotten Letter.

**OUTPUT FILE:**
DHEVS_02_THE_STREET_REMEMBERS.mp4

END OF PRODUCTION PROMPT.
```

</details>

### DHEVS_03 — The Forgotten Letter

**Timeline:** 00:30–00:45  
**Model:** MiniMax H3  
**Standalone file:** [`CLIP_03_THE_FORGOTTEN_LETTER.md`](prompts/CLIP_03_THE_FORGOTTEN_LETTER.md)  
**Open raw prompt:** [View full Markdown](prompts/CLIP_03_THE_FORGOTTEN_LETTER.md?raw=1)

<details>
<summary>Show full DHEVS_03 prompt (scroll within the code panel)</summary>

```text
# PROJECT: DUNG HOI EM VI SAO
# DONGHP — CINEMATIC MUSIC VIDEO

## DHEVS_03 — THE FORGOTTEN LETTER

- Timeline: 00:30–00:45
- Duration: 15 seconds
- Platform: ElevenLabs Image & Video
- Model: MiniMax H3
- Aspect ratio: Landscape 16:9
- Resolution: 480p
- Outputs: 1

## INPUT MODE — FRAME MODE

**Start Frame:** `DHEVS_03_START_FRAME_FROM_DHEVS_02.jpg`  
This is the actual final frame extracted from the approved DHEVS_02 video. Use it as the exact first frame. Continue DongHP's movement naturally from the neon music-store scene.

**End Frame:** `DHEVS_03_OPTIONAL_END_FRAME_LETTER_REVEAL.png`  
Use it as the target final composition: the opened old letter, sepia keepsake photograph, dried flower, dark bedding, cool blue window light and warm amber lamp light.

**Image References:** Do not add any. In ElevenLabs MiniMax H3, Start/End Frames and free-form image references are mutually exclusive. This production uses Frame Mode to preserve the exact hand-off from DHEVS_02 and the ending composition.

---

## COPY-READY PROMPT

PROJECT: DUNG HOI EM VI SAO — DONGHP CINEMATIC MUSIC VIDEO
DHEVS_03 — THE FORGOTTEN LETTER
TIMELINE: 00:30–00:45 | DURATION: 15 SECONDS | LANDSCAPE 16:9 | 480P

### FRAME CONTINUITY

Use the uploaded Start Frame as the exact first frame. It is the actual final frame of the approved DHEVS_02 video, showing DongHP walking beside a neon-lit vintage music store. Continue naturally from this precise moment. Preserve the same adult Vietnamese man, recognizable face whenever visible, short black hair, rectangular dark-framed glasses, black leather jacket, dark inner shirt and dark trousers.

Use the uploaded End Frame as the required final visual composition: an opened aged letter on dark bedding, a faded sepia keepsake photograph, a pressed dried flower, cool blue window light and warm amber bedside lighting.

Create a coherent 15-second cinematic sequence between these two frames. Use clean editorial cuts between locations. Do not morph the street, corridor, bedroom, letter or photograph into one another. The Start Frame must remain the exact opening image and the End Frame must be closely matched at the end.

### CREATIVE OBJECTIVE

This is the third chapter of the Vietnamese romantic music video “Đừng Hỏi Em Vì Sao”. After leaving the music store, DongHP returns to his quiet apartment and discovers an old farewell letter. He opens it and finds a faded photograph and a pressed flower — small objects that bring back a lost relationship.

The letter and keepsakes are the emotional focus. Do not make this another portrait scene. Show DongHP briefly and naturally; let the environment, his black leather sleeve, hands and the old letter tell the story.

### SHOT 1 — LEAVING THE MUSIC STORE (00:00–00:02.5)

Continue directly from the exact Start Frame. DongHP takes one or two natural steps away from the neon music-store window. He lowers his gaze slightly and turns away from the display. Use a restrained side/rear tracking movement. Preserve his face, glasses, hairstyle and black leather jacket. Do not create a new opening portrait.

At approximately 2.5 seconds, make a clean cinematic cut to the apartment corridor. This is an editorial cut, not a visual morph or dissolve between unrelated locations.

### SHOT 2 — THE WAY HOME (00:02.5–00:05.5)

Show DongHP from behind walking through a quiet, modest apartment corridor at night. His black leather jacket and dark trousers remain unchanged. Cool blue light from the rainy city fades behind him; a warm amber light glows through a partly open bedroom door. Follow him with a smooth, stable rear tracking shot. Keep his face mostly out of view.

### SHOT 3 — THE EMPTY ROOM (00:05.5–00:08.5)

Cut to a wide establishing view of a modest bedroom at night. A single bed with slightly rumpled dark navy bedding sits beside a rain-speckled window. Cool blue moonlight enters through the window. A small warm amber bedside lamp illuminates an old sealed cream-colored envelope on the bed. DongHP enters the room and notices the letter. Keep the room layout, bed and lighting visually coherent.

### SHOT 4 — THE HAND THAT REMEMBERS (00:08.5–00:12.0)

Cut to an overhead close-up of the bed. DongHP's right hand, emerging from the same black leather jacket sleeve, slowly reaches for the old envelope. His fingers pause, touch the paper, lift it and carefully unfold the letter. Show realistic anatomy, exactly five natural fingers, believable joints and restrained movement. Use a gentle camera push-in and realistic paper texture. Do not show his face in this shot.

### SHOT 5 — THE MEMORY INSIDE (00:12.0–00:15.0)

Reveal a small faded sepia keepsake photograph and a delicate pressed dried flower inside the opened letter. Use a cinematic macro close-up. The photograph may show a couple from behind or as indistinct silhouettes; do not invent sharp, detailed faces. DongHP's hand becomes still. Warm amber light falls across the aged paper while cool blue shadows remain in the background. End by closely matching the uploaded End Frame. Hold the final composition steadily for the last moment.

### CAMERA AND VISUAL STYLE

Use five clearly separated editorial shots: continuing side/rear movement, rear corridor tracking, wide bedroom establishing shot, overhead hand close-up, final macro detail. Keep camera motion smooth, measured and physically plausible. Avoid rapid zooms, whip pans, uncontrolled handheld shake or unnecessary camera orbit.

Authentic 1980s-inspired Vietnamese romantic cinema; subtle 35mm film grain; restrained neon blue and magenta remnants from the street; cool blue moonlight; warm amber practical lamp; realistic skin, leather, paper and fabric textures; soft highlight halation; natural shadows; cinematic depth of field; emotional restraint.

### CHARACTER IDENTITY AND NEGATIVE CONSTRAINTS

DongHP must remain the same adult Vietnamese man. Preserve his recognizable facial identity whenever visible, rectangular dark-framed glasses, short black hairstyle, natural proportions, black leather jacket and dark inner shirt. No face replacement, face morphing, age change, beautification, ghosting or duplicate character. No costume changes.

No additional people in the bedroom or corridor. No deformed hands, extra fingers or unnatural joints. No duplicated letter, photograph or flower. No changing room layout. No readable generated handwriting; handwriting may appear as indistinct natural marks only. No subtitles, lyrics, captions, logos or watermarks. No dialogue, singing, lip-sync, narration, generated music or sound effects. The original MP3 soundtrack will be added separately in CapCut.

### FINAL OUTPUT

Generate exactly one 15-second video, landscape 16:9, 480p, using MiniMax H3. Use the supplied Start Frame as the exact opening frame and the supplied End Frame as the final composition. No additional Image References. Preserve character continuity and use clean editorial cuts between locations.

OUTPUT FILE: `DHEVS_03_THE_FORGOTTEN_LETTER.mp4`

END OF PROMPT.
```

</details>

### DHEVS_04 — Golden Memories

**Timeline:** 00:45–01:00  
**Model:** MINIMAX H3 MAX  
**Standalone file:** [`CLIP_04_GOLDEN_MEMORIES.md`](prompts/CLIP_04_GOLDEN_MEMORIES.md)  
**Open raw prompt:** [View full Markdown](prompts/CLIP_04_GOLDEN_MEMORIES.md?raw=1)

<details>
<summary>Show full DHEVS_04 prompt (scroll within the code panel)</summary>

```text
PROJECT: DUNG HOI EM VI SAO
DONGHP — CINEMATIC MUSIC VIDEO

DHEVS_04 — GOLDEN MEMORIES
Vietnamese title: Những Ngày Tháng Hạnh Phúc
TIMELINE: 00:45–01:00 | DURATION: EXACTLY 15 SECONDS
FORMAT: LANDSCAPE 16:9 | TARGET: 480p | MODEL: MINIMAX H3 MAX

1. START FRAME / END FRAME CONTRACT

START FRAME: Use the uploaded first image as the exact opening frame. It is the actual final frame of approved DHEVS_03: an opened old letter, faded sepia photograph and pressed dried flower on dark bedding. Begin from this precise composition. Preserve the letter, photograph, flower, bedding, lighting and camera angle for the opening moment.

END FRAME: Use the uploaded second image as the required final composition: DongHP's hand, emerging from a black leather jacket sleeve, gently holds one small fresh white wildflower while the woman's hand rests softly over his. Background: softly blurred lakeside at golden hour. Match hand positions, flower, black leather sleeve, woman's light-cream knit sleeve, light direction and framing as closely as possible.

Create ONE 15-second video anchored by these frames. No additional Image or Video References. Use clean editorial cuts; never morph the bedroom into the lakeside or transform one face/location into another.

2. STORY AND EMOTIONAL OBJECTIVE

This is chapter four of “Đừng Hỏi Em Vì Sao”. DHEVS_03 revealed a forgotten letter and pressed flower. Now reveal the memory behind it: DongHP and the woman he loved shared a beautiful sunset, and she gave him the flower when it was fresh.

Create a warm, intimate, tender and nostalgic flashback, subtly suggesting this happiness belongs to the past. Make the connection between DHEVS_03's dried flower and this fresh flower unmistakable. Tell the story through gestures, silhouettes, hands and light—not dialogue or exaggerated acting.

3. SHOT 01 — THE PHOTOGRAPH COMES ALIVE | 00:00–00:02.5

Begin exactly on the DHEVS_03 final frame. Briefly hold the opened letter, sepia photograph and pressed flower. Gently push in toward the flower. Warm golden light appears across the paper. At about 2 seconds, cut to a fresh white wildflower in sunset light. This is an editorial match cut, NOT a magical transformation or bedroom-to-outdoor morph.

4. SHOT 02 — WALKING TOGETHER | 00:02.5–00:06.0

Show DongHP and the woman walking hand in hand along a peaceful lakeside path at sunset, mainly from behind or as soft backlit silhouettes. Begin wide, showing calm water, horizon and low golden sun; transition to smooth rear tracking as they walk naturally.

DongHP is the same adult Vietnamese man from DHEVS_01–03. Preserve his recognizable face, short dark hair, rectangular glasses, black leather jacket and dark shirt whenever visible. The woman wears a flowing light-cream dress; keep her face hidden or turned away. Gentle breeze; relaxed, affectionate body language.

5. SHOT 03 — THE FLOWER IN YOUR HAND | 00:06.0–00:09.5

Cut to an intimate close-up of their hands. The woman gently places one small fresh white wildflower into DongHP's open palm. He looks down briefly and softly closes his fingers around the stem without crushing it. Show anatomically correct hands, believable joints and restrained movement. Keep DongHP's black leather sleeve visible and both faces out of frame. Focus on flower and hands against a softly blurred lake and sunset.

This is the key story event: the fresh flower is the same keepsake later found dried inside the DHEVS_03 letter. Make the gesture spontaneous and delicate.

6. SHOT 04 — THE HAPPIEST MOMENT | 00:09.5–00:12.5

Show a side medium shot of the couple sitting beside the lake. The woman gently rests her head on DongHP's shoulder as they look toward the low sun. Keep her face hidden; let them become natural silhouettes as the camera eases toward a wider rear view. Convey quiet trust and happiness, without theatrical gestures.

7. SHOT 05 — A MOMENT THAT LASTS FOREVER | 00:12.5–00:15.0

Cut to a close-up matching the uploaded End Frame. DongHP holds the fresh white wildflower in the hand emerging from his black leather sleeve. The woman's hand rests over his, with her light-cream knit sleeve visible. Golden sunlight passes through the petals. Keep the lakeside blurred. Match the End Frame's hand positions, sleeves, flower, light and framing. Hold steadily; this flower bridges into DHEVS_05 — RAIN OF MEMORIES.

8. CAMERA, EDITING AND VISUAL LANGUAGE

Use five distinct shots: macro dried flower; wide lakeside/rear tracking; flower exchange close-up; side medium/sunset silhouette; final joined-hands close-up. Clean cuts, motivated movement, consistent screen direction, realistic depth of field and natural motion blur. Avoid rapid zoom, whip pan, shake, orbit and repeated frontal portraits.

VISUAL STYLE: Photorealistic 1980s romantic cinema: golden-hour sunset, honey/amber highlights, soft backlight, gentle breeze, subtle 35mm grain, delicate halation, realistic textures, optical bokeh and natural shadows. Make this warmer and softer than the cool blue/magenta present in DHEVS_01–03. Restrained color; no excessive orange, oversaturation or artificial glow.

9. CHARACTER IDENTITY AND STRICT NEGATIVE CONSTRAINTS

DONGHP: Preserve DongHP's facial proportions, short dark hair, rectangular glasses, natural skin, black leather jacket and dark shirt. No face replacement, beautification, age shift or outfit change.

WOMAN: Adult romantic partner shown only from behind/in silhouette, face turned away. Keep her light-cream dress and silhouette consistent; no detailed or identifiable face.

Avoid extra people, face drift/replacement, morphing, ghosting, altered glasses/hair/clothes, deformed hands, extra fingers, broken wrists, unnatural contact, duplicated/disappearing/changed flower, inconsistent sleeves, horizon instability, flicker, location morphs, text, subtitles, lyrics, logos, watermarks, dialogue, singing, lip-sync, narration, music or sound effects.

The original MP3 soundtrack will be added separately in CapCut. Do not generate or alter the song.

10. FINAL OUTPUT CONTRACT

Generate exactly ONE video:
Project ID: DHEVS_04
Title: GOLDEN MEMORIES
Timeline: 00:45–01:00
Duration: 15 seconds
Model: MiniMax H3 Max (select this exact model if available)
Aspect Ratio: Landscape 16:9
Resolution: 480p
Start Frame: Actual final frame extracted from DHEVS_03
End Frame: DHEVS_04_END_FRAME_FLOWER_HAND.png
Image References: None | Video References: None
Variations: 1 | Generated Audio: Off, if available

Preserve opening continuity from DHEVS_03 and closely match the supplied flower-in-hand End Frame. The fresh flower is the central visual symbol linking the happy past to the painful present in DHEVS_05.

OUTPUT FILE: DHEVS_04.mp4

END OF PRODUCTION PROMPT.
```

</details>

### DHEVS_05 — Rain Of Memories

**Timeline:** 01:00–01:15  
**Model:** MiniMax H3 Max (preferred; select the exact label if available)  
**Standalone file:** [`CLIP_05_RAIN_OF_MEMORIES.md`](prompts/CLIP_05_RAIN_OF_MEMORIES.md)  
**Open raw prompt:** [View full Markdown](prompts/CLIP_05_RAIN_OF_MEMORIES.md?raw=1)

<details>
<summary>Show full DHEVS_05 prompt (scroll within the code panel)</summary>

```text
# PROJECT: DUNG HOI EM VI SAO
# DONGHP — CINEMATIC MUSIC VIDEO

## DHEVS_05 — RAIN OF MEMORIES

Timeline: 01:00–01:15 | Duration: exactly 15 seconds  
Model: MiniMax H3 Max (preferred; select the exact label if available)  
Format: Landscape 16:9 | Resolution: 480p | Outputs: 1

### 1. START FRAME / END FRAME CONTRACT

**START FRAME:** Use the actual final frame extracted from approved `DHEVS_04.mp4`: DongHP's black-leather-sleeved hand holds a fresh white flower while the woman's hand rests over his in golden light. Preserve this exact opening composition. Do not use an unrelated avatar portrait. The file `DHEVS_05_START_FRAME_REFERENCE_FROM_DHEVS_04_APPROVED_END.png` is only a fallback design reference, not a verified video frame; the actual DHEVS_04 ending takes priority.

**END FRAME:** Use `DHEVS_05_END_FRAME_GUITAR_FLOWER.png`: DongHP's black-leather-sleeved hand rests on acoustic-guitar strings; the same wet white flower lies beside it; a rain-speckled window shows blurred blue/magenta city lights, balanced by a warm amber lamp. Match the hand, flower, guitar, sleeve and lighting.

Use these as the opening and ending anchors. No additional Image or Video References. Use clean cuts, never morph between the sunset, rainy street and music room.

### 2. CREATIVE OBJECTIVE

Create chapter five of the Vietnamese romantic music video **“Đừng Hỏi Em Vì Sao”**. DHEVS_04 showed DongHP and the woman he loved sharing a fresh white flower at sunset. Return to the present: she is gone, the city is raining, and DongHP is alone with the same flower. He walks through the rain, protects the flower, returns to a dim music room and approaches his acoustic guitar. The flower links the happy past to the lonely present.

Emotional progression: **last touch → return to the present → isolation in the rain → fragile keepsake → music as his remaining expression**. Keep acting restrained and believable. Tell the story visually, without dialogue or lyrics.

### 3. SHOT 01 — THE LAST TOUCH | 00:00–00:02.5

Begin exactly on the DHEVS_04 final frame. Hold the joined hands and flower briefly. The woman's hand gently releases DongHP and leaves frame; he keeps the flower. At about 2 seconds, make a clean cut from warm memory to cold present—never morph. The first frame must match the Start Frame.

### 4. SHOT 02 — THE CITY IN THE RAIN | 00:02.5–00:06.0

Cut to a wide nighttime city street after heavy rain. DongHP is alone, small within the frame, beneath blue, cyan and magenta neon. Rain falls visibly through streetlights; wet asphalt, puddles and building reflections create depth. Begin with an elevated wide shot, then gently descend toward DongHP walking alone. Let the city dominate, not his face. Match the urban-night visual language of DHEVS_01–02.

### 5. SHOT 03 — WALKING THROUGH THE RAIN | 00:06.0–00:09.5

Cut to a medium rear/side tracking shot. DongHP walks slowly through the rain without an umbrella, wearing the same black leather jacket, dark inner shirt and dark trousers. Rain beads on the leather and catches neon light. His head is lowered and pace measured. Show his face only briefly. Preserve his facial proportions, short dark hair and rectangular dark-framed glasses. No long frontal close-up; track smoothly at walking speed.

### 6. SHOT 04 — THE FLOWER IN THE RAIN | 00:09.5–00:12.5

Cut to an extreme close-up of DongHP's hand emerging from the same black leather sleeve. He carefully holds the small white flower. Droplets gather on the petals and fingers; blue and magenta reflections shimmer in the soft background. His fingers slowly close around the stem without crushing it. Keep exactly one flower, with stable petals and stem. Show realistic skin, five natural fingers and believable joints. Use macro depth of field and a gentle push-in; keep the hand and flower in focus.

### 7. SHOT 05 — THE LAST SONG AWAITS | 00:12.5–00:15.0

Cut to a dim music room by a rain-speckled window. A warm amber lamp contrasts with cool blue/magenta city lights. An acoustic guitar rests on a wooden table. DongHP places the same flower beside it, then rests his hand on the strings, poised to play. No full performance or fast strumming. Match the End Frame: black leather sleeve, hand on guitar strings, wet flower, rainy window and amber lamp. Hold steadily; lead into DHEVS_06 — THE LAST SONG.

### 8. CAMERA AND VISUAL DIRECTION

Use five distinct shots and clean cuts: flower/hand opening, wide rainy city, rear/side tracking, macro flower-in-hand, guitar-and-flower ending. Contrast warm memory with cold blue/magenta present. Keep motion smooth and plausible; use realistic rain, reflections, depth of field and natural blur. Avoid rapid zooms, whip pans, orbit, unstable perspective, repeated portraits or redundant shots. Each shot adds a new event.

### 9. CHARACTER IDENTITY AND CONTINUITY LOCK

DongHP is the same adult Vietnamese man from DHEVS_01–04. Preserve facial geometry, natural skin, short dark hair and rectangular dark-framed glasses whenever visible. Keep black leather jacket, dark shirt and trousers unchanged. No replacement, beautification, age shift or redesign. When his face is hidden, preserve silhouette and proportions. The woman appears only as the opening hand releasing his; she is absent from the present. Keep one identical fresh white flower throughout; do not change its species, color or size.

### 10. STRICT NEGATIVE CONSTRAINTS

No identity drift, face replacement, distorted glasses, hair/outfit changes, duplicate people, ghosting, double exposure or morphing. No extra characters or umbrella. No deformed hands, extra/fused fingers, broken wrists or unnatural contact. No disappearing/duplicated flower, changing guitar, missing strings or impossible hand placement. No rain through solid objects, flicker, unstable reflections, location morphs or abrupt camera jumps. No readable text, subtitles, lyrics, captions, logos or watermarks. No dialogue, singing, lip-sync, narration, generated music or sound effects. Add the original MP3 separately in CapCut.

### 11. FINAL OUTPUT CONTRACT

Generate ONE video: `DHEVS_05.mp4`; 15 seconds; landscape 16:9; 480p; one output. Model: MiniMax H3 Max if available. Start Frame: actual final frame of approved `DHEVS_04.mp4`. End Frame: `DHEVS_05_END_FRAME_GUITAR_FLOWER.png`. No additional Image/Video References. Audio off if available. Preserve opening continuity and closely match the guitar-and-flower End Frame. The final image should feel as though DongHP carried the flower—and its memory—back into the music room.

OUTPUT FILE: DHEVS_05.mp4

END OF PRODUCTION PROMPT.
```

</details>

### DHEVS_06 — The Last Song

**Timeline:** 01:15–01:30  
**Model:** MiniMax H3 Max (preferred; choose this exact label if available)  
**Standalone file:** [`CLIP_06_THE_LAST_SONG.md`](prompts/CLIP_06_THE_LAST_SONG.md)  
**Open raw prompt:** [View full Markdown](prompts/CLIP_06_THE_LAST_SONG.md?raw=1)

<details>
<summary>Show full DHEVS_06 prompt (scroll within the code panel)</summary>

```text
# PROJECT: DUNG HOI EM VI SAO — DONGHP CINEMATIC MUSIC VIDEO
## DHEVS_06 — THE LAST SONG

Timeline: 01:15–01:30 | Exactly 15 seconds | Landscape 16:9 | 480p | 1 output  
Model: MiniMax H3 Max (preferred; choose this exact label if available)  
Output filename: `DHEVS_06.mp4`

### 1. START FRAME / END FRAME CONTRACT

**START FRAME:** Use the actual final decoded frame of approved `DHEVS_05.mp4`, preserving the music-room composition: black-leather-sleeved hand on guitar strings, same white flower, rainy window, blue/magenta reflections and amber lamp. `DHEVS_06_START_FRAME_REFERENCE_FROM_DHEVS_05_APPROVED_END.png` is only a fallback copy of the planned DHEVS_05 End Frame, NOT a verified video frame. Use the actual last frame if it differs.

**END FRAME:** Use `DHEVS_06_END_FRAME_THE_LAST_SONG.png`. Match DongHP seated with guitar, head inclined, hands naturally on strings/fretboard, one white flower, old photo and folded letter on the table, rainy blue/magenta window and amber lamp. Preserve his S11 identity: natural face, short dark hair and rectangular dark glasses; same black leather jacket and dark shirt.

Use only these Start/End Frame anchors. No extra Image/Video References or morphing; use clean motivated cuts.

### 2. CREATIVE OBJECTIVE

This is the emotional centerpiece of **“Đừng Hỏi Em Vì Sao”**. Alone in the same room from DHEVS_05, DongHP finally plays guitar. The song is a private conversation with the woman he loved; the flower, letter and photo quietly connect him to the past. Keep his performance restrained and sincere, never theatrical. Emotional progression: **first chord → remembered touch → emotion behind his eyes → keepsakes → lingering final chord**. No new location or character.

### 3. SHOT 01 — THE FIRST CHORD | 00:00–00:02.5

Begin exactly on the actual DHEVS_05 final frame. Hold the hand on the guitar strings, flower, rainy window and amber lamp. DongHP makes a small natural finger adjustment and gently plays the first chord. Preserve opening positions, props and lighting. The first frame must match the Start Frame; do not begin with a new portrait or room.

### 4. SHOT 02 — THE HANDS REMEMBER | 00:02.5–00:05.5

Clean cut to a macro view of the performance: right hand softly plucks or brushes the strings while the left forms a simple chord on the fretboard. Show subtle string vibration, realistic wood grain and warm highlights. Playing is slow and plausible, never rapid or virtuoso. Hands have five natural fingers, correct joints and believable contact; guitar body, neck and strings remain stable. Use shallow depth of field and a gentle lateral move. This is a distinct detail shot, not a repeat of Shot 01.

### 5. SHOT 03 — THE SONG ON HIS FACE | 00:05.5–00:08.5

Cut to a medium close three-quarter/profile view of DongHP seated with the guitar. Preserve the same adult Vietnamese man, natural skin texture, short dark hair, rectangular dark-framed glasses and recognizable face. He looks down at the fretboard, breathes slowly and briefly closes his eyes as he feels the music. Emotion is quiet and believable—no exaggerated crying, forced smile or theatrical gesture. Use a subtle push-in. Keep his mouth relaxed: no dialogue, visible singing or lip-sync. Wardrobe remains the black leather jacket and dark shirt.

### 6. SHOT 04 — THE MEMORY BESIDE HIM | 00:08.5–00:11.5

Clean cut to the table beside the guitar. The same single white flower rests beside one folded letter and one old sepia photograph. Focus first on the flower, then gently rack focus to the letter and photo; DongHP and guitar remain softly visible behind. The photograph is a physical still object, not an animated memory or portal. Do not reveal a woman's newly generated face or add another person. No readable writing. A paper edge may tremble slightly from the guitar, but keepsakes stay in place. No fantasy overlay.

### 7. SHOT 05 — THE LAST SONG | 00:11.5–00:15.0

Return to DongHP playing in the same room. He completes one slow chord progression and lets his right hand settle over the strings. No dramatic strumming. Ease the camera back enough to include DongHP, guitar, flower, letter and photo, with rainy window and amber lamp behind. End on a steady composition closely matching `DHEVS_06_END_FRAME_THE_LAST_SONG.png`: head inclined toward the guitar, hands natural, keepsakes on the table. Hold the final image to suggest the chord lingering and lead into DHEVS_07 — **LEARNING TO LET GO**.

### 8. CAMERA AND VISUAL DIRECTION

Keep five distinct shots and clean cuts. Camera moves are restrained: gentle push-in, controlled macro track, subtle pullback; no whip pans, fast zooms, orbiting or shake. Balance warm amber light on skin/guitar/wood with cool blue-cyan and subtle magenta rain reflections. Natural skin tones, realistic contrast, cinematic depth. Rain stays outside; room is intimate, not a concert stage. Avoid excessive glow, flare, haze and oversaturated neon.

### 9. CHARACTER / WARDROBE / PROP CONTINUITY

DongHP is the same man from DHEVS_01–05 and approved S11 reference. Preserve face geometry, natural skin, short dark hair and rectangular dark glasses; no identity drift, replacement, beautification or age change. Keep black leather jacket and dark shirt. Maintain one stable acoustic guitar, one unchanged white flower, one folded letter and one sepia photo. They are physical keepsakes, not extra characters or animated images. Same room, rainy window, amber lamp and blue/magenta reflections.

### 10. STRICT NEGATIVE CONSTRAINTS

No identity/face drift, distorted glasses, hairstyle or wardrobe changes, duplicate people, ghosts, woman silhouettes, new characters or audience. No lip-sync, dialogue, narration, AI music or sound effects. No malformed hands/fingers, broken wrists, impossible fingering, duplicated strings, warped or changing guitar. No disappearing/duplicated flower, changing flower type, floating props, moving keepsakes or readable writing. No subtitles, lyrics, captions, logos or watermarks. No double exposure, fantasy portal, flashback montage, location morph, flicker, jitter, unstable reflections, rain indoors or abrupt lighting changes. Do not return to the street, add an umbrella, strum rapidly or overact. Add original MP3 separately in CapCut.

### 11. FINAL OUTPUT CONTRACT

Generate ONE video: `DHEVS_06.mp4`; 15 seconds; 16:9 landscape; 480p; one output. Use MiniMax H3 Max if available; otherwise use the exact model used for DHEVS_05 and record its displayed label. Start Frame: actual final frame of DHEVS_05 (included PNG is fallback only). End Frame: `DHEVS_06_END_FRAME_THE_LAST_SONG.png`. No extra references; audio off. Preserve character and prop continuity. Final frame must match End Frame and bridge calmly to DHEVS_07.

OUTPUT FILE: DHEVS_06.mp4

END OF PRODUCTION PROMPT.
```

</details>

### DHEVS_07 — Learning To Let Go

**Timeline:** 01:30–01:45  
**Model:** MiniMax H3 Max  
**Standalone file:** [`CLIP_07_LEARNING_TO_LET_GO.md`](prompts/CLIP_07_LEARNING_TO_LET_GO.md)  
**Open raw prompt:** [View full Markdown](prompts/CLIP_07_LEARNING_TO_LET_GO.md?raw=1)

<details>
<summary>Show full DHEVS_07 prompt (scroll within the code panel)</summary>

```text

# PROJECT: DUNG HOI EM VI SAO — DONGHP CINEMATIC MUSIC VIDEO
## DHEVS_07 — LEARNING TO LET GO

Timeline: 01:30–01:45 | Exactly 15 seconds
Model: MiniMax H3 Max
Format: Landscape 16:9 | 480p | Outputs: 1
Output: DHEVS_07.mp4

### 1. START FRAME / END FRAME CONTRACT

**START FRAME:** Use `DHEVS_07_START_FRAME_FROM_DHEVS_06_ACTUAL_LAST_FRAME.png`, the actual final decoded frame of approved `DHEVS_06.mp4` (832x480). It shows DongHP seated with his acoustic guitar; the white flower, old photograph and letter are on the table, with rainy window and amber lamp. The first generated frame must match this image. Do not substitute an avatar or recreate the room.

**END FRAME:** Use `DHEVS_07_END_FRAME_RIVERSIDE_SUNRISE.png`. Match the wide rear view: DongHP in the same black leather jacket and dark trousers walks away along a wet riverside promenade toward a warm sunrise; trees frame the left, calm water and distant skyline open to the right, and golden light reflects on the path. Keep his face hidden. No text or logos.

Use only these Start/End Frame anchors. Do not add Image or Video References. Use clean cuts between locations; never morph the music room into the riverside.

### 2. CREATIVE OBJECTIVE

Create chapter seven of **“Đừng Hỏi Em Vì Sao”**. After the last guitar performance, DongHP accepts that the past will remain part of him, but he no longer needs to hold on to it. He acknowledges the flower, letter and old photograph, leaves the room, and walks beside the water at first light. This is not forgetting or rejecting the woman; it is accepting the memory with gratitude and choosing to continue living.

Emotional progression: **last chord → quiet acknowledgement → respectful farewell → first steps outside → calm forward movement**. Keep acting restrained, mature and believable. No melodrama, dialogue or lyrics on screen.

### 3. SHOT 01 — AFTER THE LAST CHORD | 00:00–00:02.5

Begin exactly on the actual DHEVS_06 final frame. Hold the same room, guitar, flower, photograph, letter, rainy window and amber lamp. DongHP lets his right hand rest gently on the strings as the final chord fades, then slowly raises his gaze toward the window. Only small, realistic movement. Do not change props, wardrobe, lighting or composition before the first cut.

### 4. SHOT 02 — A GENTLE FAREWELL | 00:02.5–00:06.0

Clean cut to a close detail of DongHP's black-leather-sleeved hand and the keepsakes. He carefully lifts the same single white flower and places it gently on the folded letter beside the same sepia photograph. His fingers pause, then withdraw. The gesture is peaceful, not dramatic. Preserve the flower's shape and petals; do not crush or duplicate it. Keep letter and photograph stable and physical. No readable writing, no new person or image emerging from the photograph. Use a controlled macro push-in, warm amber light and cool window bokeh.

### 5. SHOT 03 — LEAVING THE ROOM | 00:06.0–00:09.0

Cut to a medium-wide rear/side view. DongHP rises, turns from the table and walks toward the doorway. Keep his black leather jacket, dark shirt and dark trousers unchanged. The guitar stays in the room; he does not carry it. Follow smoothly at natural walking speed. At the doorway, make a clean cut to a quiet city street just after rain, with early dawn warming the horizon and wet pavement reflecting pale gold. No location morph and no other people.

### 6. SHOT 04 — A QUIETER HEART | 00:09.0–00:12.0

Show a brief medium close side/profile view outdoors in soft early-morning light. Preserve DongHP's natural facial geometry, short dark hair and rectangular dark-framed glasses. His expression is calm and reflective; he takes one gentle breath and looks toward the brightening sky. No crying, forced smile, lip-sync or theatrical acting. Keep the same jacket and dark clothing. Use a subtle, steady camera move; avoid a long frontal close-up.
