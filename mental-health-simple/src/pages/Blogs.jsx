import { useState } from 'react'
import { 
  Search, 
  Calendar, 
  Clock, 
  User, 
  Tag, 
  ArrowRight,
  Filter,
  BookOpen,
  Heart,
  Brain,
  Shield,
  Lightbulb
} from 'lucide-react'

const blogCategories = [
  { id: 'all', name: 'All Posts', icon: BookOpen },
  { id: 'tips', name: 'Tips & Tricks', icon: Lightbulb },
  { id: 'wellness', name: 'Wellness', icon: Heart },
  { id: 'mindfulness', name: 'Mindfulness', icon: Brain },
  { id: 'safety', name: 'Safety & Support', icon: Shield },
]

const blogPosts = [
  {
    id: 1,
    title: '5 Simple Breathing Techniques for Instant Stress Relief',
    excerpt: 'Learn powerful breathing exercises that you can do anywhere, anytime to quickly reduce stress and anxiety.',
    content: `Breathing exercises are one of the most effective ways to manage stress and anxiety. When we're stressed, our breathing becomes shallow and rapid, which can actually make us feel more anxious. By consciously controlling our breath, we can activate our body's relaxation response and quickly calm our nervous system.

Here are five scientifically-proven breathing techniques you can practice anywhere, anytime:

## 1. The 4-7-8 Breathing Technique
This technique, developed by Dr. Andrew Weil, is incredibly effective for falling asleep and reducing anxiety:
- Inhale through your nose for 4 counts
- Hold your breath for 7 counts
- Exhale through your mouth for 8 counts
- Repeat this cycle 3-4 times

The longer exhale activates your parasympathetic nervous system, promoting deep relaxation.

## 2. Box Breathing (4-4-4-4)
Used by Navy SEALs to stay calm under pressure:
- Inhale for 4 counts
- Hold for 4 counts
- Exhale for 4 counts
- Hold empty for 4 counts
- Repeat for 3-5 minutes

This technique helps regulate your nervous system and improves focus.

## 3. Diaphragmatic Breathing
Also known as "belly breathing," this engages your diaphragm for deeper, more effective breathing:
- Place one hand on your chest, one on your belly
- Breathe in slowly through your nose, letting your belly rise
- Your chest should move very little
- Exhale slowly through pursed lips
- Practice for 5-10 minutes daily

## 4. Alternate Nostril Breathing (Nadi Shodhana)
A yogic technique that balances your nervous system:
- Close your right nostril with your thumb
- Inhale through your left nostril
- Close your left nostril with your ring finger
- Exhale through your right nostril
- Continue alternating for 5-10 minutes

## 5. The Physiological Sigh
A quick technique for immediate stress relief:
- Take two quick inhales through your nose
- Follow with one long exhale through your mouth
- Repeat 2-3 times

This mimics the body's natural stress-relief mechanism and can be done discreetly anywhere.

## When to Use These Techniques
- Before important meetings or presentations
- During panic attacks or anxiety episodes
- Before bedtime to improve sleep
- During meditation or mindfulness practice
- Anytime you feel overwhelmed or stressed

## Pro Tips for Success
- Practice regularly, even when you're not stressed
- Start with just 2-3 minutes and gradually increase
- Find a quiet space initially, then practice in various environments
- Be patient with yourself - it takes time to master these techniques
- Combine with visualization or positive affirmations for enhanced effects

Remember, the key to effective breathing exercises is consistency. Even just 5 minutes of daily practice can significantly improve your stress management and overall mental wellbeing.`,
    author: 'Dr. Sarah Chen',
    date: '2024-01-15',
    readTime: '8 min read',
    category: 'tips',
    tags: ['breathing', 'stress relief', 'anxiety', 'relaxation'],
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=300&fit=crop',
    featured: true
  },
  {
    id: 2,
    title: 'Building a Morning Routine for Better Mental Health',
    excerpt: 'Discover how a structured morning routine can significantly improve your mental wellbeing and set a positive tone for the day.',
    content: `A consistent morning routine can be a game-changer for your mental health. Research shows that people with structured morning routines experience lower levels of stress, better mood regulation, and improved overall wellbeing. The key is creating a routine that energizes you rather than drains you.

## Why Morning Routines Matter for Mental Health

Your morning routine sets the tone for your entire day. When you start with intention and self-care, you're more likely to:
- Feel in control of your day
- Experience reduced anxiety and stress
- Maintain better emotional regulation
- Have higher energy levels
- Make healthier choices throughout the day

## The Science Behind Morning Routines

Studies have found that morning routines help regulate your circadian rhythm, which directly impacts:
- Sleep quality
- Mood stability
- Cognitive function
- Stress hormone levels
- Immune system function

## Building Your Perfect Morning Routine

### Phase 1: The Foundation (First 15 minutes)
**1. Wake Up Consistently**
- Set a consistent wake-up time, even on weekends
- Avoid hitting snooze - it disrupts your sleep cycle
- Place your alarm across the room to force you to get up

**2. Hydrate First**
- Drink a glass of water immediately upon waking
- Your body is dehydrated after 7-8 hours of sleep
- Add lemon for an extra boost of vitamin C

**3. Get Natural Light**
- Step outside or sit by a window for 5-10 minutes
- Natural light helps reset your circadian rhythm
- This is especially important in winter months

### Phase 2: Movement & Mindfulness (15-30 minutes)
**4. Gentle Movement**
- 5-10 minutes of stretching or yoga
- A short walk around your neighborhood
- Simple exercises like jumping jacks or push-ups
- The goal is to get your blood flowing, not exhaust yourself

**5. Mindfulness Practice**
- 5-10 minutes of meditation or deep breathing
- Gratitude journaling - write down 3 things you're grateful for
- Mindful coffee or tea drinking
- Visualization of your day going well

### Phase 3: Nourishment & Preparation (15-20 minutes)
**6. Nutritious Breakfast**
- Include protein, healthy fats, and complex carbs
- Avoid sugary cereals or pastries
- Examples: oatmeal with nuts and berries, eggs with avocado toast
- Eat mindfully without distractions

**7. Plan Your Day**
- Review your schedule and priorities
- Set 2-3 main goals for the day
- Identify potential stressors and how you'll handle them
- Use a planner or digital calendar

## Sample Morning Routines by Time Available

### The 15-Minute Routine (Busy Mornings)
1. Wake up and drink water (2 min)
2. Get natural light (3 min)
3. 5-minute meditation (5 min)
4. Quick breakfast (5 min)

### The 30-Minute Routine (Moderate Time)
1. Wake up and hydrate (3 min)
2. Get natural light (5 min)
3. 10-minute yoga or stretching (10 min)
4. 5-minute meditation (5 min)
5. Nutritious breakfast (7 min)

### The 60-Minute Routine (Luxury Time)
1. Wake up and hydrate (3 min)
2. Get natural light (10 min)
3. 20-minute workout or yoga (20 min)
4. 10-minute meditation (10 min)
5. Gratitude journaling (5 min)
6. Nutritious breakfast (10 min)
7. Day planning (2 min)

## Common Mistakes to Avoid

**1. Overcomplicating Your Routine**
- Start simple and add elements gradually
- Don't try to do everything at once
- Focus on consistency over perfection

**2. Being Too Rigid**
- Allow for flexibility when needed
- Have a "minimum viable routine" for busy days
- Don't beat yourself up for missing a day

**3. Skipping Weekends**
- Maintain some consistency even on weekends
- You can sleep in but keep the core elements
- This prevents "Monday morning blues"

**4. Not Preparing the Night Before**
- Lay out clothes and prepare breakfast ingredients
- Set up your meditation space
- Charge devices and set alarms

## Troubleshooting Common Challenges

**"I'm Not a Morning Person"**
- Start by waking up just 15 minutes earlier
- Use a gradual approach - 5 minutes earlier each week
- Focus on the benefits you'll feel throughout the day

**"I Don't Have Time"**
- Even 5 minutes of intentional morning time helps
- Look for time wasters in your evening routine
- Consider going to bed 15 minutes earlier

**"I Keep Forgetting"**
- Set phone reminders for each step
- Create a visual checklist
- Start with just one new habit at a time

## Making It Stick

**1. Start Small**
- Begin with just one new habit
- Master it before adding another
- Celebrate small wins

**2. Track Your Progress**
- Use a habit tracker app
- Mark successful days on a calendar
- Notice how you feel on days with vs. without your routine

**3. Adjust as Needed**
- Your routine should evolve with your life
- Change seasons, work schedules, or personal needs
- Be flexible and forgiving with yourself

## The Long-Term Benefits

After 30 days of consistent practice, you'll likely notice:
- Improved mood and energy levels
- Better stress management
- Enhanced focus and productivity
- Stronger sense of control over your life
- Better sleep quality
- Increased self-confidence

Remember, the best morning routine is the one you'll actually do consistently. Start small, be patient with yourself, and gradually build the routine that works best for your life and mental health needs.`,
    author: 'Michael Rodriguez',
    date: '2024-01-12',
    readTime: '12 min read',
    category: 'wellness',
    tags: ['morning routine', 'mental health', 'productivity', 'wellness'],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop',
    featured: false
  },
  {
    id: 3,
    title: 'The Science of Gratitude: How It Changes Your Brain',
    excerpt: 'Explore the neurological benefits of practicing gratitude and learn simple techniques to incorporate it into your daily life.',
    content: `Research shows that gratitude practice can literally rewire your brain for happiness. Over the past two decades, neuroscientists have discovered that gratitude isn't just a nice feeling—it's a powerful tool that can fundamentally change how your brain works, leading to lasting improvements in mental health and overall wellbeing.

## The Neuroscience of Gratitude

When you practice gratitude, several key areas of your brain light up with activity:

**The Prefrontal Cortex**: This area, responsible for decision-making and emotional regulation, becomes more active during gratitude practice. This helps you better manage stress and make more thoughtful decisions.

**The Anterior Cingulate Cortex**: This region processes emotions and empathy. Gratitude practice strengthens connections here, making you more emotionally intelligent and compassionate.

**The Hypothalamus**: This tiny but powerful region controls essential functions like sleep, appetite, and stress hormones. Gratitude practice helps regulate these systems, leading to better sleep and reduced stress.

**The Ventral Tegmental Area (VTA)**: This is your brain's reward center. When you practice gratitude, it releases dopamine—the same "feel-good" chemical released during pleasurable activities like eating chocolate or receiving a compliment.

## How Gratitude Rewires Your Brain

### 1. Neuroplasticity in Action
Your brain is constantly changing and adapting—a process called neuroplasticity. When you regularly practice gratitude, you're essentially training your brain to:
- Notice positive experiences more easily
- Focus on what's going well rather than what's wrong
- Build stronger neural pathways associated with happiness
- Reduce activity in areas linked to depression and anxiety

### 2. The Gratitude Circuit
Researchers have identified what they call the "gratitude circuit"—a network of brain regions that work together when you feel grateful:
- **Hippocampus**: Stores and retrieves positive memories
- **Amygdala**: Processes emotions and threat detection (gratitude helps calm this area)
- **Insula**: Connects emotions with bodily sensations
- **Temporal Lobe**: Processes language and meaning

### 3. Long-term Structural Changes
After just 8 weeks of regular gratitude practice, studies show:
- Increased gray matter density in the prefrontal cortex
- Stronger connections between brain regions
- Reduced activity in the amygdala (fear center)
- Enhanced activity in areas associated with positive emotions

## The Psychological Benefits

### Immediate Effects (Within Days)
- Improved mood and emotional state
- Better sleep quality
- Reduced stress and anxiety levels
- Increased feelings of social connection
- Enhanced self-esteem and confidence

### Medium-term Effects (Within Weeks)
- Greater resilience to stress and adversity
- Improved relationships and social connections
- Better physical health markers
- Increased optimism and positive outlook
- Enhanced emotional regulation

### Long-term Effects (Months to Years)
- Reduced risk of depression and anxiety
- Improved overall life satisfaction
- Better physical health outcomes
- Stronger immune system function
- Increased longevity

## Evidence-Based Gratitude Practices

### 1. The Gratitude Journal
**What it is**: Writing down 3-5 things you're grateful for each day
**How to do it**:
- Set aside 5-10 minutes each evening
- Write specific, detailed entries (not just "I'm grateful for my family")
- Focus on people, experiences, or moments from that day
- Include why you're grateful for each item

**Example**:
- "I'm grateful for the barista who remembered my usual coffee order and asked about my day. It made me feel seen and valued in a small but meaningful way."
- "I'm grateful for the 10-minute walk I took during lunch. The fresh air and movement helped clear my mind and gave me energy for the afternoon."

### 2. Gratitude Letters
**What it is**: Writing a detailed letter to someone who has positively impacted your life
**How to do it**:
- Choose someone you've never properly thanked
- Write a detailed letter explaining their impact on your life
- Be specific about what they did and how it affected you
- Consider reading it to them in person or over video call

**Benefits**: This practice can increase happiness for up to a month after writing the letter.

### 3. The Three Good Things Exercise
**What it is**: Reflecting on three positive events from your day and their causes
**How to do it**:
- Each evening, think of three good things that happened
- For each event, identify what caused it to happen
- Consider your role in making it happen
- Reflect on how it made you feel

### 4. Gratitude Meditation
**What it is**: A guided meditation focused on gratitude
**How to do it**:
- Find a quiet space and sit comfortably
- Close your eyes and take several deep breaths
- Think of someone you're grateful for
- Imagine them in front of you and mentally thank them
- Notice the feelings that arise
- Move on to another person or thing you're grateful for
- Continue for 5-15 minutes

### 5. Gratitude Walks
**What it is**: Taking a mindful walk while focusing on gratitude
**How to do it**:
- Go for a 10-20 minute walk
- As you walk, notice things you're grateful for
- It could be the weather, nature, your health, or anything around you
- Say "thank you" silently or out loud for each thing
- Focus on the present moment and your surroundings

## Common Challenges and Solutions

### "I Can't Think of Anything to Be Grateful For"
**Solution**: Start small and be specific
- The roof over your head
- Clean water to drink
- A comfortable bed
- A friend who texted you
- A good meal you had
- Your ability to read this article

### "It Feels Forced or Fake"
**Solution**: Focus on authenticity over quantity
- It's better to write one genuine gratitude than five forced ones
- Start with small, simple things
- Remember that gratitude is a skill that improves with practice

### "I Forget to Do It Regularly"
**Solution**: Make it a habit
- Set a phone reminder
- Link it to an existing habit (like brushing your teeth)
- Keep a gratitude journal by your bed
- Use a gratitude app

### "I Don't See Results Quickly"
**Solution**: Be patient and consistent
- Gratitude is like exercise for your brain—results take time
- Focus on the process, not the outcome
- Even small practices can have significant effects
- Track your mood and energy levels to notice subtle changes

## The Ripple Effect

Gratitude doesn't just benefit you—it creates positive ripples throughout your life:

**In Relationships**: Grateful people are more likely to:
- Express appreciation to others
- Be more forgiving and understanding
- Have stronger, more satisfying relationships
- Be better at resolving conflicts

**At Work**: Gratitude practice can lead to:
- Better job satisfaction
- Improved relationships with colleagues
- Increased productivity and creativity
- Better leadership skills

**In Health**: Regular gratitude practice is associated with:
- Lower blood pressure
- Stronger immune system
- Better sleep quality
- Reduced inflammation
- Faster recovery from illness

## Getting Started: A 30-Day Challenge

**Week 1**: Gratitude Journal
- Write down 3 things you're grateful for each day
- Focus on being specific and detailed

**Week 2**: Add Gratitude Meditation
- Continue journaling
- Add 5 minutes of gratitude meditation each morning

**Week 3**: Gratitude Letters
- Continue previous practices
- Write one gratitude letter to someone important

**Week 4**: Gratitude Walks
- Continue all previous practices
- Add one gratitude walk per week

## The Bottom Line

Gratitude is more than just positive thinking—it's a powerful practice that can literally rewire your brain for happiness. The science is clear: regular gratitude practice leads to measurable changes in brain structure and function, resulting in improved mental health, better relationships, and enhanced overall wellbeing.

The best part? It's completely free, takes just a few minutes a day, and the benefits compound over time. Start small, be consistent, and watch as gratitude transforms not just your brain, but your entire life.`,
    author: 'Dr. Emily Watson',
    date: '2024-01-10',
    readTime: '15 min read',
    category: 'mindfulness',
    tags: ['gratitude', 'neuroscience', 'happiness', 'meditation'],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop',
    featured: true
  },
  {
    id: 4,
    title: 'Recognizing the Signs: When to Seek Professional Help',
    excerpt: 'Learn to identify when your mental health concerns require professional intervention and how to take the first steps.',
    content: `Knowing when to seek professional help for mental health concerns is one of the most important skills you can develop. Many people struggle with this decision, often waiting too long or feeling uncertain about whether their concerns are "serious enough" to warrant professional intervention.

The truth is, seeking help is a sign of strength, not weakness. Mental health professionals are trained to help with a wide range of concerns, from everyday stress to serious mental health conditions. Early intervention often leads to better outcomes and can prevent problems from worsening.

## Red Flags: When to Seek Immediate Help

### Crisis Situations
Seek immediate help if you experience:
- **Thoughts of self-harm or suicide**
- **Thoughts of harming others**
- **Severe panic attacks that last more than 30 minutes**
- **Inability to care for basic needs (eating, sleeping, hygiene)**
- **Experiencing hallucinations or delusions**
- **Substance abuse that's out of control**

**Emergency Resources:**
- National Suicide Prevention Lifeline: 988
- Crisis Text Line: Text HOME to 741741
- Emergency Services: 911
- Local emergency room

### Warning Signs That Require Professional Attention

**1. Persistent Changes in Mood or Behavior**
- Feeling sad, anxious, or irritable most of the time for 2+ weeks
- Extreme mood swings that affect daily functioning
- Loss of interest in activities you once enjoyed
- Feeling hopeless or worthless
- Excessive worry or fear that's difficult to control

**2. Sleep and Appetite Changes**
- Significant changes in sleep patterns (too much or too little)
- Difficulty falling asleep or staying asleep
- Nightmares or night terrors
- Major changes in appetite or weight
- Loss of appetite or overeating

**3. Physical Symptoms**
- Unexplained physical pain or discomfort
- Frequent headaches, stomachaches, or other physical complaints
- Changes in energy levels (constant fatigue or restlessness)
- Physical symptoms that don't respond to medical treatment

**4. Cognitive Changes**
- Difficulty concentrating or making decisions
- Memory problems that affect daily life
- Confusion or disorientation
- Racing thoughts or inability to slow down your mind
- Intrusive thoughts that are difficult to control

**5. Social and Relationship Issues**
- Withdrawing from friends and family
- Difficulty maintaining relationships
- Increased conflict with others
- Feeling disconnected from people around you
- Avoiding social situations you used to enjoy

**6. Work or School Problems**
- Significant decline in performance
- Frequent absences or tardiness
- Difficulty completing tasks
- Increased errors or accidents
- Conflicts with colleagues or supervisors

## Types of Mental Health Professionals

### Psychiatrists
- **What they do**: Medical doctors who can diagnose mental health conditions and prescribe medication
- **When to see them**: For medication evaluation, severe mental health conditions, or when therapy alone isn't sufficient
- **Education**: Medical degree (MD or DO) plus psychiatric residency

### Psychologists
- **What they do**: Provide therapy and psychological testing, cannot prescribe medication (in most states)
- **When to see them**: For therapy, psychological assessment, or treatment of mental health conditions
- **Education**: Doctoral degree (PhD or PsyD) in psychology

### Licensed Clinical Social Workers (LCSW)
- **What they do**: Provide therapy and help with social and environmental factors affecting mental health
- **When to see them**: For therapy, especially when dealing with family or social issues
- **Education**: Master's degree in social work plus clinical licensure

### Licensed Professional Counselors (LPC)
- **What they do**: Provide therapy for a wide range of mental health concerns
- **When to see them**: For individual, couples, or family therapy
- **Education**: Master's degree in counseling plus state licensure

### Marriage and Family Therapists (MFT)
- **What they do**: Specialize in relationship and family issues
- **When to see them**: For couples counseling, family therapy, or relationship issues
- **Education**: Master's degree in marriage and family therapy plus licensure

## How to Take the First Steps

### 1. Start with Your Primary Care Doctor
- They can provide initial assessment and referrals
- They can rule out physical causes of symptoms
- They may be able to prescribe medication if needed
- They understand your overall health history

### 2. Use Your Insurance Provider
- Check your insurance website for covered providers
- Call the member services number for assistance
- Ask about mental health benefits and coverage
- Get a list of in-network providers

### 3. Ask for Recommendations
- Ask friends, family, or colleagues for recommendations
- Check with your primary care doctor
- Ask other healthcare providers you trust
- Look for online reviews and ratings

### 4. Consider Your Preferences
- **Gender**: Do you prefer a male or female therapist?
- **Age**: Would you prefer someone closer to your age?
- **Specialties**: Look for someone who specializes in your specific concerns
- **Location**: Consider convenience and accessibility
- **Availability**: Check their schedule and availability

### 5. Make the Initial Contact
- Call or email to schedule a consultation
- Ask about their approach and experience
- Inquire about fees and insurance coverage
- Ask about their availability and scheduling

## What to Expect in Your First Session

### The Initial Assessment
- Discussion of your current concerns and symptoms
- Questions about your mental health history
- Questions about your family history
- Discussion of your goals for treatment
- Questions about your current life situation

### Treatment Planning
- Discussion of treatment options
- Setting realistic goals
- Establishing a treatment schedule
- Discussion of confidentiality and privacy
- Questions about your preferences

### Building Rapport
- Getting to know your therapist
- Establishing trust and comfort
- Discussing any concerns or questions
- Understanding the therapeutic process
- Setting expectations for treatment

## Common Barriers to Seeking Help

### "I Should Be Able to Handle This Myself"
- **Reality**: Mental health professionals are trained to help with these exact issues
- **Analogy**: You wouldn't try to perform surgery on yourself—mental health treatment is similar
- **Remember**: Seeking help is a sign of strength and self-awareness

### "It's Not That Bad"
- **Reality**: Early intervention often leads to better outcomes
- **Consider**: How long have you been struggling? How much is it affecting your life?
- **Remember**: You don't have to wait until things are "bad enough"

### "I Don't Have Time"
- **Reality**: Many therapists offer flexible scheduling, including evenings and weekends
- **Consider**: How much time are you losing to your mental health struggles?
- **Remember**: Investing in your mental health is an investment in your overall wellbeing

### "I Can't Afford It"
- **Reality**: Many options exist for affordable mental health care
- **Options**: Insurance coverage, sliding scale fees, community mental health centers, online therapy
- **Remember**: Your mental health is worth the investment

### "What Will People Think?"
- **Reality**: Mental health treatment is becoming more accepted and normalized
- **Consider**: Would you judge someone else for seeking help?
- **Remember**: You don't have to tell everyone about your treatment

## When to Consider a Different Therapist

### Signs It's Not a Good Fit
- You don't feel comfortable or safe
- You don't feel heard or understood
- The therapist's approach doesn't work for you
- You don't see progress after several sessions
- You have fundamental disagreements about treatment

### How to Handle This
- Be honest about your concerns
- Ask for adjustments to the approach
- Consider trying a different therapist
- Remember that finding the right fit is important

## The Bottom Line

Seeking professional help for mental health concerns is a courageous and important step. You don't have to wait until you're in crisis—early intervention often leads to better outcomes. Trust your instincts, and remember that mental health professionals are there to help, not judge.

The most important thing is taking that first step. Whether you're dealing with everyday stress or more serious concerns, professional help can provide the support, tools, and guidance you need to improve your mental health and overall wellbeing.

Remember: You are not alone, and help is available. Your mental health matters, and you deserve support.`,
    author: 'Dr. James Thompson',
    date: '2024-01-08',
    readTime: '12 min read',
    category: 'safety',
    tags: ['professional help', 'mental health signs', 'support', 'therapy'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500&h=300&fit=crop',
    featured: false
  },
  {
    id: 5,
    title: 'Digital Detox: Reclaiming Your Mental Space',
    excerpt: 'Discover the mental health benefits of reducing screen time and learn practical strategies for a healthier digital relationship.',
    content: `In our hyperconnected world, digital devices have become extensions of ourselves. We check our phones 96 times per day on average, and the average person spends over 7 hours daily looking at screens. While technology has brought incredible benefits, this constant digital stimulation is taking a toll on our mental health.

Research shows that excessive screen time is linked to increased anxiety, depression, sleep problems, attention difficulties, and social isolation. The good news? A digital detox can help you reclaim your mental space and improve your overall wellbeing.

## The Mental Health Impact of Digital Overload

### How Technology Affects Your Brain

**Dopamine Addiction**: Social media and apps are designed to trigger dopamine releases, creating addictive patterns. Each notification, like, or message provides a small hit of pleasure that keeps you coming back for more.

**Attention Fragmentation**: Constant switching between apps and tasks fragments your attention, making it harder to focus deeply on important work or relationships.

**Social Comparison**: Social media often leads to upward social comparison, making you feel inadequate compared to others' curated highlight reels.

**Sleep Disruption**: Blue light from screens suppresses melatonin production, disrupting your natural sleep-wake cycle.

**Reduced Face-to-Face Interaction**: Digital communication can't replace the emotional benefits of in-person social connection.

### Signs You Need a Digital Detox

- Checking your phone first thing in the morning and last thing at night
- Feeling anxious when separated from your devices
- Difficulty concentrating on tasks without checking your phone
- Using devices to avoid uncomfortable emotions or situations
- Neglecting real-world relationships in favor of digital ones
- Feeling overwhelmed by the constant stream of information
- Experiencing FOMO (Fear of Missing Out) when not connected
- Physical symptoms like eye strain, neck pain, or headaches

## The Benefits of Digital Detox

### Mental Health Improvements
- **Reduced Anxiety**: Less exposure to stressful news and social comparison
- **Better Sleep**: Improved sleep quality and duration
- **Enhanced Focus**: Increased ability to concentrate on single tasks
- **Improved Mood**: Less exposure to negative content and comparison
- **Reduced Stress**: Less pressure to be constantly available and responsive

### Physical Health Benefits
- **Better Sleep**: Improved sleep quality and easier falling asleep
- **Reduced Eye Strain**: Less digital eye strain and headaches
- **Improved Posture**: Less time hunched over devices
- **More Physical Activity**: Time previously spent on devices can be used for exercise
- **Better Nutrition**: More mindful eating without digital distractions

### Social and Relationship Benefits
- **Deeper Connections**: More meaningful face-to-face interactions
- **Better Communication**: Improved listening and conversation skills
- **Reduced Social Anxiety**: Less comparison and pressure from social media
- **Enhanced Empathy**: Better ability to read social cues and emotions
- **Stronger Relationships**: More quality time with loved ones

## Types of Digital Detox

### 1. Complete Digital Detox
**Duration**: 24-72 hours
**What it involves**: Completely disconnecting from all digital devices
**Best for**: Breaking addictive patterns and gaining perspective
**Challenges**: Can feel extreme and may not be practical for work

### 2. Partial Digital Detox
**Duration**: 1-4 weeks
**What it involves**: Reducing screen time by 50-75% and eliminating non-essential apps
**Best for**: Gradual transition and maintaining some connectivity
**Challenges**: Requires discipline and planning

### 3. Digital Minimalism
**Duration**: Ongoing lifestyle change
**What it involves**: Using technology intentionally and mindfully
**Best for**: Long-term sustainable change
**Challenges**: Requires ongoing commitment and regular evaluation

### 4. Micro-Detoxes
**Duration**: 1-4 hours daily
**What it involves**: Regular short breaks from devices
**Best for**: Busy schedules and gradual habit change
**Challenges**: Easy to skip or forget

## How to Plan Your Digital Detox

### Step 1: Assess Your Current Usage
- Use built-in screen time tracking on your devices
- Identify your most time-consuming apps
- Note when and why you use devices most
- Track your emotional state before and after device use

### Step 2: Set Clear Goals
- Define what you want to achieve
- Set specific, measurable goals
- Choose a realistic timeline
- Identify potential obstacles and solutions

### Step 3: Prepare for the Detox
- Inform important contacts about your reduced availability
- Set up auto-replies for emails and messages
- Download offline content (books, podcasts, music)
- Plan alternative activities
- Remove tempting apps from your home screen

### Step 4: Create a Support System
- Tell friends and family about your goals
- Find an accountability partner
- Join online communities focused on digital wellness
- Consider professional support if needed

## Practical Digital Detox Strategies

### 1. The 30-30-30 Rule
- 30 minutes of device-free time when you wake up
- 30 minutes of device-free time before bed
- 30 minutes of device-free time during meals

### 2. The Phone-Free Zones
- Bedroom (charge phone in another room)
- Dining room/kitchen table
- Bathroom
- Car (use hands-free only)
- Social gatherings

### 3. The App Audit
- Delete apps you don't actively use
- Remove social media apps from your home screen
- Turn off non-essential notifications
- Use grayscale mode to reduce visual appeal

### 4. The Scheduled Check-ins
- Check email only 2-3 times per day
- Set specific times for social media
- Use a timer to limit browsing sessions
- Plan device-free activities during peak usage times

### 5. The One-Device Rule
- Use only one device at a time
- Close other apps when using one
- Avoid multitasking between devices
- Focus on one task completely

## Alternative Activities During Detox

### Physical Activities
- Walking or hiking in nature
- Yoga or stretching
- Gardening or outdoor projects
- Sports or exercise classes
- Dancing or movement

### Creative Pursuits
- Drawing, painting, or crafting
- Writing in a journal
- Playing a musical instrument
- Cooking or baking
- Photography (without social media)

### Social Activities
- Coffee dates with friends
- Board games or puzzles
- Volunteer work
- Join clubs or groups
- Attend events or classes

### Learning and Growth
- Reading physical books
- Listening to podcasts
- Taking online courses
- Learning a new skill
- Attending workshops

## Managing Withdrawal Symptoms

### Common Withdrawal Symptoms
- Restlessness and anxiety
- Boredom and restlessness
- FOMO (Fear of Missing Out)
- Difficulty concentrating
- Irritability and mood swings
- Physical discomfort

### Coping Strategies
- **Boredom**: Embrace it as an opportunity for creativity
- **Anxiety**: Practice deep breathing and mindfulness
- **FOMO**: Remember that most social media content isn't urgent
- **Restlessness**: Engage in physical activity
- **Mood swings**: Be patient and kind with yourself

## Maintaining Digital Wellness Long-term

### 1. Set Clear Boundaries
- Establish specific times for device use
- Create rules for different contexts (work, home, social)
- Communicate boundaries to others
- Regularly review and adjust boundaries

### 2. Practice Mindful Technology Use
- Ask "Why am I picking up my phone?" before each use
- Set intentions for your digital interactions
- Be present and focused when using devices
- Regularly evaluate if your usage aligns with your values

### 3. Create Tech-Free Rituals
- Morning routine without devices
- Device-free meals
- Evening wind-down without screens
- Weekly tech-free activities

### 4. Use Technology Intentionally
- Choose apps that add value to your life
- Set specific purposes for each app
- Regularly audit and remove unnecessary apps
- Use tools that support your goals

## Digital Detox Challenges and Solutions

### "I Need My Phone for Work"
**Solution**: Set specific work hours for device use, use a separate work phone if possible, or establish clear boundaries about after-hours availability.

### "I'll Miss Important Information"
**Solution**: Set up specific times to check important sources, use news aggregators, or designate someone to alert you to truly urgent matters.

### "My Friends Will Think I'm Ignoring Them"
**Solution**: Communicate your detox plans in advance, suggest alternative ways to connect, or schedule regular check-ins.

### "I Don't Know What to Do Without My Phone"
**Solution**: Create a list of alternative activities, start with short periods, and gradually increase the duration.

### "I'll Feel Left Out"
**Solution**: Remember that most social media content isn't urgent, focus on quality over quantity in relationships, and plan meaningful offline activities.

## The Bottom Line

A digital detox isn't about completely abandoning technology—it's about creating a healthier, more intentional relationship with your devices. The goal is to use technology as a tool that enhances your life rather than controls it.

Start small, be patient with yourself, and remember that the benefits of reduced screen time—better sleep, improved focus, deeper relationships, and enhanced mental health—are worth the initial discomfort of change.

Your mental space is precious. Reclaim it, protect it, and use it wisely. The digital world will still be there when you return, but you'll be returning with a clearer mind, a calmer spirit, and a renewed sense of what truly matters.`,
    author: 'Lisa Park',
    date: '2024-01-05',
    readTime: '14 min read',
    category: 'wellness',
    tags: ['digital detox', 'screen time', 'mental health', 'wellness'],
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=300&fit=crop',
    featured: false
  },
  {
    id: 6,
    title: 'Sleep Hygiene: The Foundation of Mental Wellness',
    excerpt: 'Learn how quality sleep directly impacts your mental health and discover evidence-based strategies for better rest.',
    content: `Sleep is not a luxury—it's a biological necessity that directly impacts every aspect of your mental health. When you're sleep-deprived, your brain literally cannot function at its best. Research shows that just one night of poor sleep can increase anxiety by 30% and reduce emotional regulation by 60%.

Yet, despite knowing how important sleep is, many of us struggle to get the quality rest we need. The good news? Sleep hygiene—a set of practices and habits that promote good sleep—can dramatically improve both your sleep quality and your mental wellbeing.

## The Science of Sleep and Mental Health

### How Sleep Affects Your Brain

**Memory Consolidation**: During sleep, your brain processes and consolidates memories, helping you learn and retain information better.

**Emotional Processing**: Sleep helps your brain process emotions and regulate mood. Without adequate sleep, you're more likely to experience negative emotions and have difficulty managing stress.

**Toxin Clearance**: Your brain clears out harmful toxins, including beta-amyloid (associated with Alzheimer's disease), during deep sleep.

**Hormone Regulation**: Sleep regulates important hormones like cortisol (stress), growth hormone, and insulin, all of which affect your mental health.

**Neural Plasticity**: Sleep is crucial for brain plasticity—your brain's ability to adapt and change, which is essential for learning and recovery.

### The Mental Health Impact of Poor Sleep

**Anxiety and Depression**: Sleep deprivation increases the risk of developing anxiety and depression by 2-3 times. It also makes existing symptoms worse.

**Emotional Regulation**: Poor sleep makes it harder to control emotions, leading to increased irritability, mood swings, and overreactions.

**Cognitive Function**: Sleep deprivation impairs attention, concentration, decision-making, and problem-solving abilities.

**Stress Response**: Lack of sleep makes you more sensitive to stress and less able to cope with challenges.

**Social Relationships**: Sleep-deprived people are more likely to have relationship problems and social difficulties.

## The Sleep Cycle: Understanding Your Body's Natural Rhythm

### The 90-Minute Sleep Cycle
Your sleep consists of 4-6 cycles per night, each lasting about 90 minutes:

**Stage 1 (N1)**: Light sleep, transition from wakefulness
**Stage 2 (N2)**: Deeper sleep, body temperature drops, heart rate slows
**Stage 3 (N3)**: Deep sleep, physical restoration, immune system strengthening
**REM Sleep**: Rapid Eye Movement, dreaming, memory consolidation, emotional processing

### Circadian Rhythm
Your body's internal clock that regulates sleep-wake cycles:
- Controlled by the suprachiasmatic nucleus in your brain
- Influenced by light exposure, especially blue light
- Regulates melatonin production
- Affects body temperature, hormone release, and alertness

## The Fundamentals of Sleep Hygiene

### 1. Consistent Sleep Schedule
**Why it matters**: Your circadian rhythm thrives on consistency. Going to bed and waking up at the same time every day (including weekends) helps regulate your internal clock.

**How to do it**:
- Choose a bedtime that allows for 7-9 hours of sleep
- Set a consistent wake-up time
- Gradually adjust your schedule if needed (15-30 minutes per week)
- Use an alarm to maintain consistency
- Avoid sleeping in on weekends (limit to 1 hour later)

### 2. Create a Sleep-Inducing Environment
**Temperature**: Keep your bedroom cool (65-68°F or 18-20°C)
**Darkness**: Use blackout curtains or an eye mask
**Noise**: Use earplugs or white noise machines
**Comfort**: Invest in a comfortable mattress and pillows
**Cleanliness**: Keep your bedroom clean and clutter-free

### 3. Establish a Relaxing Bedtime Routine
**Wind-down period**: Start 1-2 hours before bedtime
**Relaxing activities**: Reading, gentle stretching, meditation, or warm bath
**Avoid stimulating activities**: Work, intense exercise, or exciting TV shows
**Consistent routine**: Do the same activities in the same order each night

### 4. Limit Screen Time Before Bed
**Blue light**: Suppresses melatonin production
**Mental stimulation**: Screens can be mentally engaging
**Recommendation**: Avoid screens 1-2 hours before bed
**Alternatives**: Read a book, listen to music, or practice relaxation techniques

### 5. Watch What You Eat and Drink
**Caffeine**: Avoid 6-8 hours before bedtime
**Alcohol**: Can disrupt sleep quality even if it helps you fall asleep
**Large meals**: Avoid eating 2-3 hours before bed
**Fluids**: Limit fluids 2 hours before bed to avoid nighttime bathroom trips

## Advanced Sleep Hygiene Strategies

### 1. Light Exposure Management
**Morning light**: Get 10-30 minutes of natural light within an hour of waking
**Evening light**: Dim lights 2-3 hours before bedtime
**Blue light filters**: Use apps or glasses to reduce blue light in the evening
**Light therapy**: Consider a light therapy box for seasonal affective disorder

### 2. Exercise and Sleep
**Timing**: Exercise 3-6 hours before bedtime for best results
**Type**: Moderate aerobic exercise is most beneficial
**Consistency**: Regular exercise improves sleep quality over time
**Avoid**: Intense exercise within 3 hours of bedtime

### 3. Stress Management
**Relaxation techniques**: Deep breathing, progressive muscle relaxation, or meditation
**Journaling**: Write down worries or to-do lists before bed
**Gratitude practice**: Focus on positive aspects of your day
**Professional help**: Consider therapy if stress is significantly affecting sleep

### 4. Sleep Environment Optimization
**Mattress**: Replace every 7-10 years or when uncomfortable
**Pillows**: Choose based on sleep position and comfort
**Bedding**: Use breathable, comfortable materials
**Air quality**: Use air purifiers if needed, maintain good ventilation

## Common Sleep Problems and Solutions

### Difficulty Falling Asleep
**Causes**: Stress, anxiety, caffeine, screen time, irregular schedule
**Solutions**: 
- Practice relaxation techniques
- Use the 4-7-8 breathing method
- Try progressive muscle relaxation
- Get out of bed if you can't sleep after 20 minutes

### Frequent Nighttime Awakenings
**Causes**: Stress, medical conditions, medications, environmental factors
**Solutions**:
- Address underlying causes
- Use white noise or earplugs
- Keep bedroom cool and dark
- Avoid checking the time

### Early Morning Awakening
**Causes**: Depression, anxiety, age-related changes, light exposure
**Solutions**:
- Address mental health concerns
- Use blackout curtains
- Consider light therapy
- Maintain consistent sleep schedule

### Restless Sleep
**Causes**: Stress, poor sleep environment, medical conditions
**Solutions**:
- Improve sleep environment
- Practice stress management
- Consider sleep study if symptoms persist
- Address underlying health issues

## Sleep Disorders and When to Seek Help

### Insomnia
**Symptoms**: Difficulty falling asleep, staying asleep, or early awakening
**When to seek help**: If symptoms persist for 3+ months and affect daily functioning
**Treatment**: Cognitive Behavioral Therapy for Insomnia (CBT-I), medication, lifestyle changes

### Sleep Apnea
**Symptoms**: Loud snoring, gasping for air, excessive daytime sleepiness
**When to seek help**: If you suspect sleep apnea, especially with risk factors
**Treatment**: CPAP machine, lifestyle changes, weight management

### Restless Legs Syndrome
**Symptoms**: Uncomfortable sensations in legs, urge to move legs
**When to seek help**: If symptoms significantly affect sleep or daily life
**Treatment**: Medication, lifestyle changes, iron supplements

### Circadian Rhythm Disorders
**Symptoms**: Difficulty falling asleep or waking up at desired times
**When to seek help**: If schedule adjustments don't help
**Treatment**: Light therapy, chronotherapy, medication

## Creating Your Personal Sleep Plan

### Step 1: Assess Your Current Sleep
- Track your sleep for 1-2 weeks
- Note bedtime, wake time, sleep quality, and factors affecting sleep
- Identify patterns and problem areas

### Step 2: Set Sleep Goals
- Determine your ideal bedtime and wake time
- Set specific, measurable goals
- Choose 2-3 sleep hygiene practices to focus on first

### Step 3: Make Gradual Changes
- Start with one change at a time
- Give each change 1-2 weeks to take effect
- Track your progress and adjust as needed

### Step 4: Monitor and Adjust
- Continue tracking your sleep
- Celebrate improvements
- Adjust your plan based on what works
- Seek professional help if needed

## Sleep Hygiene for Different Life Stages

### Children and Teens
- Need 9-11 hours of sleep per night
- Establish consistent bedtime routines
- Limit screen time before bed
- Encourage physical activity during the day

### Adults (18-64)
- Need 7-9 hours of sleep per night
- Balance work, family, and personal time
- Manage stress and maintain healthy habits
- Address sleep problems promptly

### Older Adults (65+)
- May need 7-8 hours of sleep per night
- Common challenges: frequent awakenings, early rising
- Maintain regular sleep schedule
- Address medical conditions affecting sleep

## The Long-term Benefits of Good Sleep Hygiene

### Mental Health Benefits
- Reduced risk of depression and anxiety
- Better emotional regulation
- Improved cognitive function
- Enhanced stress resilience
- Better social relationships

### Physical Health Benefits
- Stronger immune system
- Better cardiovascular health
- Improved metabolism and weight management
- Reduced inflammation
- Better physical performance

### Quality of Life Benefits
- Increased energy and alertness
- Better mood and outlook
- Improved work performance
- Enhanced creativity and problem-solving
- Better overall life satisfaction

## The Bottom Line

Sleep hygiene is not about perfection—it's about creating habits that support your body's natural need for rest. Even small improvements in your sleep habits can have significant benefits for your mental health and overall wellbeing.

Start with the basics: consistent sleep schedule, comfortable sleep environment, and a relaxing bedtime routine. Be patient with yourself as you develop new habits, and remember that good sleep is an investment in your mental health that pays dividends every day.

Your brain and body need sleep to function at their best. Give them the rest they deserve, and watch as your mental health, mood, and overall quality of life improve. Sweet dreams!`,
    author: 'Dr. Maria Garcia',
    date: '2024-01-03',
    readTime: '16 min read',
    category: 'wellness',
    tags: ['sleep', 'mental health', 'wellness', 'sleep hygiene'],
    image: 'https://images.unsplash.com/photo-1541781774459-bb2a2d2d3f8b?w=500&h=300&fit=crop',
    featured: false
  }
]

export default function Blogs() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPost, setSelectedPost] = useState(null)

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredPosts = blogPosts.filter(post => post.featured)

  return (
    <div className="page">
      <div className="container">
        {/* Header */}
        <div className="page-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 className="page-title">Mental Health Blog</h1>
          <p className="page-subtitle">
            Expert insights, practical tips, and evidence-based strategies to support your mental wellness journey.
          </p>
        </div>

        {/* Search and Filter */}
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          marginBottom: '2rem', 
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          <div style={{ position: 'relative', flex: '1', minWidth: '300px' }}>
            <Search size={20} style={{ 
              position: 'absolute', 
              left: '1rem', 
              top: '50%', 
              transform: 'translateY(-50%)',
              color: '#6b7280'
            }} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem 0.75rem 3rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#2563eb'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            />
          </div>
          
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {blogCategories.map((category) => {
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1rem',
                    border: selectedCategory === category.id ? '1px solid #2563eb' : '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    backgroundColor: selectedCategory === category.id ? '#eff6ff' : 'white',
                    color: selectedCategory === category.id ? '#2563eb' : '#374151',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontSize: '0.875rem',
                    fontWeight: '500'
                  }}
                >
                  <Icon size={16} />
                  {category.name}
                </button>
              )
            })}
          </div>
        </div>

        {/* Featured Posts */}
        {selectedCategory === 'all' && (
          <section style={{ marginBottom: '3rem' }}>
            <h2 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '600', 
              marginBottom: '1.5rem',
              color: '#1f2937'
            }}>
              Featured Articles
            </h2>
            <div className="grid grid-2">
              {featuredPosts.map((post) => (
                <article 
                  key={post.id} 
                  className="card"
                  style={{ 
                    cursor: 'pointer',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    overflow: 'hidden'
                  }}
                  onClick={() => setSelectedPost(post)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'
                  }}
                >
                  <div style={{ 
                    height: '200px', 
                    backgroundImage: `url(${post.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '1rem',
                      left: '1rem',
                      backgroundColor: '#2563eb',
                      color: 'white',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '1rem',
                      fontSize: '0.75rem',
                      fontWeight: '600'
                    }}>
                      Featured
                    </div>
                  </div>
                  <div style={{ padding: '1.5rem' }}>
                    <div style={{ 
                      display: 'flex', 
                      gap: '0.5rem', 
                      marginBottom: '0.75rem',
                      flexWrap: 'wrap'
                    }}>
                      {post.tags.slice(0, 2).map((tag) => (
                        <span 
                          key={tag}
                          style={{
                            backgroundColor: '#f3f4f6',
                            color: '#374151',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '0.25rem',
                            fontSize: '0.75rem',
                            fontWeight: '500'
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 style={{ 
                      fontSize: '1.25rem', 
                      fontWeight: '600', 
                      marginBottom: '0.75rem',
                      color: '#1f2937',
                      lineHeight: '1.4'
                    }}>
                      {post.title}
                    </h3>
                    <p style={{ 
                      color: '#6b7280', 
                      marginBottom: '1rem',
                      lineHeight: '1.5'
                    }}>
                      {post.excerpt}
                    </p>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      fontSize: '0.875rem',
                      color: '#6b7280'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <User size={16} />
                        {post.author}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Clock size={16} />
                        {post.readTime}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* All Posts */}
        <section>
          <h2 style={{ 
            fontSize: '1.5rem', 
            fontWeight: '600', 
            marginBottom: '1.5rem',
            color: '#1f2937'
          }}>
            {selectedCategory === 'all' ? 'All Articles' : 
             blogCategories.find(cat => cat.id === selectedCategory)?.name}
          </h2>
          
          {filteredPosts.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '3rem',
              color: '#6b7280'
            }}>
              <BookOpen size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
              <p>No articles found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-3">
              {filteredPosts.map((post) => (
                <article 
                  key={post.id} 
                  className="card"
                  style={{ 
                    cursor: 'pointer',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    overflow: 'hidden'
                  }}
                  onClick={() => setSelectedPost(post)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'
                  }}
                >
                  <div style={{ 
                    height: '200px', 
                    backgroundImage: `url(${post.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative'
                  }}>
                    {post.featured && (
                      <div style={{
                        position: 'absolute',
                        top: '1rem',
                        left: '1rem',
                        backgroundColor: '#2563eb',
                        color: 'white',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '1rem',
                        fontSize: '0.75rem',
                        fontWeight: '600'
                      }}>
                        Featured
                      </div>
                    )}
                  </div>
                  <div style={{ padding: '1.5rem' }}>
                    <div style={{ 
                      display: 'flex', 
                      gap: '0.5rem', 
                      marginBottom: '0.75rem',
                      flexWrap: 'wrap'
                    }}>
                      {post.tags.slice(0, 2).map((tag) => (
                        <span 
                          key={tag}
                          style={{
                            backgroundColor: '#f3f4f6',
                            color: '#374151',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '0.25rem',
                            fontSize: '0.75rem',
                            fontWeight: '500'
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 style={{ 
                      fontSize: '1.125rem', 
                      fontWeight: '600', 
                      marginBottom: '0.75rem',
                      color: '#1f2937',
                      lineHeight: '1.4'
                    }}>
                      {post.title}
                    </h3>
                    <p style={{ 
                      color: '#6b7280', 
                      marginBottom: '1rem',
                      lineHeight: '1.5',
                      fontSize: '0.875rem'
                    }}>
                      {post.excerpt}
                    </p>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      fontSize: '0.875rem',
                      color: '#6b7280'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <User size={16} />
                        {post.author}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Clock size={16} />
                        {post.readTime}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Article Modal */}
        {selectedPost && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem'
          }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '0.5rem',
              maxWidth: '800px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
              position: 'relative'
            }}>
              <button
                onClick={() => setSelectedPost(null)}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'rgba(0,0,0,0.1)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '2rem',
                  height: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '1.25rem',
                  color: '#374151'
                }}
              >
                ×
              </button>
              
              <div style={{ 
                height: '300px', 
                backgroundImage: `url(${selectedPost.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '0.5rem 0.5rem 0 0'
              }} />
              
              <div style={{ padding: '2rem' }}>
                <div style={{ 
                  display: 'flex', 
                  gap: '0.5rem', 
                  marginBottom: '1rem',
                  flexWrap: 'wrap'
                }}>
                  {selectedPost.tags.map((tag) => (
                    <span 
                      key={tag}
                      style={{
                        backgroundColor: '#eff6ff',
                        color: '#2563eb',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '1rem',
                        fontSize: '0.75rem',
                        fontWeight: '500'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h2 style={{ 
                  fontSize: '2rem', 
                  fontWeight: '700', 
                  marginBottom: '1rem',
                  color: '#1f2937',
                  lineHeight: '1.2'
                }}>
                  {selectedPost.title}
                </h2>
                
                <div style={{ 
                  display: 'flex', 
                  gap: '2rem', 
                  marginBottom: '2rem',
                  fontSize: '0.875rem',
                  color: '#6b7280',
                  flexWrap: 'wrap'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <User size={16} />
                    {selectedPost.author}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Calendar size={16} />
                    {new Date(selectedPost.date).toLocaleDateString()}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Clock size={16} />
                    {selectedPost.readTime}
                  </div>
                </div>
                
                <div style={{ 
                  fontSize: '1.125rem',
                  lineHeight: '1.7',
                  color: '#374151'
                }}>
                  <p style={{ marginBottom: '1.5rem' }}>
                    {selectedPost.excerpt}
                  </p>
                  <p>
                    {selectedPost.content}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
