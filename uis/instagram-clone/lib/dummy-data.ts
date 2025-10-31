export interface User {
  id: string
  username: string
  bio: string
  avatar: string
  followerCount: number
  followingCount: number
  isVerified: boolean
  isSuspicious: boolean
}

export interface Post {
  id: string
  userId: string
  image: string
  caption: string
  hashtags: string[]
  likes: number
  comments: Comment[]
  timestamp: string
  isFlagged: boolean
}

export interface Comment {
  id: string
  userId: string
  text: string
  timestamp: string
  likes: number
}

export interface Message {
  id: string
  senderId: string
  text: string
  timestamp: string
  image?: string
}

export interface Chat {
  id: string
  participants: string[]
  messages: Message[]
  lastMessage: Message | null
  isFlagged: boolean
}

export interface Flag {
  id: string
  type: "post" | "chat"
  contentId: string
  flagReason: string
  keywords: string[]
  category: "drugs" | "illegal_sales" | "violence" | "fraud" | "explicit" | "other"
  confidence: number
  severity: "high" | "medium" | "low"
  timestamp: string
}

// Dummy Users
export const dummyUsers: User[] = [
  {
    id: "user_1",
    username: "sarah.travel",
    bio: "Travel enthusiast | Coffee lover ☕ | Always exploring",
    avatar: "/woman-with-camera.png",
    followerCount: 2541,
    followingCount: 342,
    isVerified: false,
    isSuspicious: false,
  },
  {
    id: "user_2",
    username: "john_photography",
    bio: "📸 Landscape & Portrait Photography | Print available",
    avatar: "/man-photographer.png",
    followerCount: 5230,
    followingCount: 189,
    isVerified: true,
    isSuspicious: false,
  },
  {
    id: "user_3",
    username: "foodie.adventures",
    bio: "Taste the world 🌍🍜 Food blogger & culinary explorer",
    avatar: "/person-eating-food.jpg",
    followerCount: 8900,
    followingCount: 423,
    isVerified: false,
    isSuspicious: false,
  },
  {
    id: "user_4",
    username: "fitness.guru22",
    bio: "💪 Personal trainer | Gym goals | DM for coaching",
    avatar: "/fit-person-gym.jpg",
    followerCount: 12340,
    followingCount: 234,
    isVerified: false,
    isSuspicious: true, // Suspicious due to coaching offers
  },
  {
    id: "user_5",
    username: "alex.art",
    bio: "Digital artist | Commission open | Commissions DM",
    avatar: "/digital-artist.png",
    followerCount: 4560,
    followingCount: 890,
    isVerified: false,
    isSuspicious: false,
  },
  {
    id: "user_6",
    username: "night.owl_deals",
    bio: "Best deals online 🤑 Exclusive offers | DM for info",
    avatar: "/person-shopping.png",
    followerCount: 3210,
    followingCount: 1200,
    isVerified: false,
    isSuspicious: true, // Suspicious due to vague "deals"
  },
  {
    id: "user_7",
    username: "nature.lover",
    bio: "Hiking | Nature photography | Environmental activist",
    avatar: "/hiker-mountain.jpg",
    followerCount: 6700,
    followingCount: 450,
    isVerified: false,
    isSuspicious: false,
  },
  {
    id: "user_8",
    username: "quickmoney.online",
    bio: "Make $$$ fast | Work from home | Click link in bio",
    avatar: "/person-at-computer.png",
    followerCount: 890,
    followingCount: 2300,
    isVerified: false,
    isSuspicious: true, // Highly suspicious - typical scam pattern
  },
  {
    id: "user_9",
    username: "music.producer",
    bio: "🎵 Making beats | Prod for hire | Beat store link below",
    avatar: "/music-producer-studio.png",
    followerCount: 3450,
    followingCount: 567,
    isVerified: false,
    isSuspicious: false,
  },
  {
    id: "user_10",
    username: "fashionista.21",
    bio: "Fashion & Style | OOTD | Collaboration inquiries welcome",
    avatar: "/fashion-woman.jpg",
    followerCount: 9200,
    followingCount: 2100,
    isVerified: false,
    isSuspicious: false,
  },
  {
    id: "user_11",
    username: "tech.innovations",
    bio: "Tech reviews | Gadgets | Subscribe to newsletter",
    avatar: "/tech-professional.png",
    followerCount: 7800,
    followingCount: 340,
    isVerified: true,
    isSuspicious: false,
  },
  {
    id: "user_12",
    username: "wellness.coach",
    bio: "Health coaching | Supplements available | DM to order",
    avatar: "/wellness-coach.png",
    followerCount: 2340,
    followingCount: 890,
    isVerified: false,
    isSuspicious: true, // Suspicious - unregulated health claims
  },
]

// Dummy Posts
export const dummyPosts: Post[] = [
  {
    id: "post_1",
    userId: "user_1",
    image: "/beach-sunset.png",
    caption:
      "Golden hour at the beach 🌅 Nothing beats watching the sunset over the ocean. Perfect way to end the week!",
    hashtags: ["#beach", "#sunset", "#travel", "#wanderlust"],
    likes: 342,
    comments: [],
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    isFlagged: false,
  },
  {
    id: "post_2",
    userId: "user_2",
    image: "/majestic-mountain-vista.png",
    caption: "Mountain peak at dawn. Captured this beauty on my morning hike. Worth every step! 📸",
    hashtags: ["#landscape", "#mountains", "#photography", "#nature"],
    likes: 1205,
    comments: [],
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    isFlagged: false,
  },
  {
    id: "post_3",
    userId: "user_3",
    image: "/sushi-plate.jpg",
    caption: "Trying authentic ramen in Tokyo! This broth is absolutely incredible 🍜✨",
    hashtags: ["#foodie", "#ramen", "#tokyo", "#japanfood"],
    likes: 567,
    comments: [],
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    isFlagged: false,
  },
  {
    id: "post_4",
    userId: "user_4",
    image: "/gym-workout.png",
    caption:
      "Another productive day at the gym! Who wants to buy my new supplement line? DM for wholesale prices. Get shredded fast!",
    hashtags: ["#gym", "#fitness", "#gains"],
    likes: 234,
    comments: [],
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    isFlagged: true, // Flagged for suspicious supplement promotion
  },
  {
    id: "post_5",
    userId: "user_5",
    image: "/abstract-digital-composition.png",
    caption: "New commission piece! Fantasy character design. Open for more commissions at reasonable rates 🎨",
    hashtags: ["#digitalart", "#commission", "#fantasy"],
    likes: 890,
    comments: [],
    timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    isFlagged: false,
  },
  {
    id: "post_6",
    userId: "user_6",
    image: "/colorful-shopping-bags.png",
    caption:
      "EXCLUSIVE OFFER!! Limited time only. Get discounts up to 80% DM for exclusive link. Very legit opportunity!!",
    hashtags: ["#deals", "#shopping", "#discount"],
    likes: 45,
    comments: [],
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    isFlagged: true, // Flagged for suspicious links and vague offers
  },
  {
    id: "post_7",
    userId: "user_7",
    image: "/forest-hiking.jpg",
    caption: "Hidden waterfall trail discovered! The ecosystem here is pristine. Let's protect our natural spaces 🌿",
    hashtags: ["#hiking", "#nature", "#conservation"],
    likes: 1340,
    comments: [],
    timestamp: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
    isFlagged: false,
  },
  {
    id: "post_8",
    userId: "user_8",
    image: "/money-cash.jpg",
    caption:
      "MAKE $5000 A WEEK FROM HOME! Guaranteed! No experience needed. DM now for starter kit only $99. Click link in bio for more details! This is 100% legit I swear!!",
    hashtags: ["#moneytips", "#workfromhome"],
    likes: 12,
    comments: [],
    timestamp: new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString(),
    isFlagged: true, // Highly flagged for obvious scam
  },
  {
    id: "post_9",
    userId: "user_9",
    image: "/music-studio.png",
    caption:
      "Just finished mixing this track! New beat pack dropping next week. Limited to 100 copies. DM for early access 🎵",
    hashtags: ["#hiphop", "#beatmaker", "#producer"],
    likes: 456,
    comments: [],
    timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
    isFlagged: false,
  },
  {
    id: "post_10",
    userId: "user_10",
    image: "/stylish-streetwear-outfit.png",
    caption: "New collection just dropped! This dress is everything 👗✨ Use code FASHION20 for 20% off!",
    hashtags: ["#ootd", "#fashion", "#style"],
    likes: 2340,
    comments: [],
    timestamp: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
    isFlagged: false,
  },
  {
    id: "post_11",
    userId: "user_2",
    image: "/sunset-city.png",
    caption: "City lights at night 🌃 There's something magical about urban landscapes",
    hashtags: ["#cityscape", "#night", "#photography"],
    likes: 876,
    comments: [],
    timestamp: new Date(Date.now() - 22 * 60 * 60 * 1000).toISOString(),
    isFlagged: false,
  },
  {
    id: "post_12",
    userId: "user_12",
    image: "/vitamins-supplements.jpg",
    caption:
      "These vitamins CURE depression and anxiety! 100% natural. Order now, limited stock. DM for wholesale. Science backed!",
    hashtags: ["#wellness", "#supplements"],
    likes: 189,
    comments: [],
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    isFlagged: true, // Flagged for false health claims
  },
]

// Dummy Chats
export const dummyChats: Chat[] = [
  {
    id: "chat_1",
    participants: ["user_1", "user_2"],
    messages: [
      {
        id: "msg_1",
        senderId: "user_1",
        text: "Hey! That mountain photo was amazing 📸",
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      },
      {
        id: "msg_2",
        senderId: "user_2",
        text: "Thanks so much! Want to go hiking this weekend?",
        timestamp: new Date(Date.now() - 28 * 60 * 1000).toISOString(),
      },
      {
        id: "msg_3",
        senderId: "user_1",
        text: "There's a great trail near here",
        timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
      },
    ],
    lastMessage: {
      id: "msg_3",
      senderId: "user_1",
      text: "There's a great trail near here",
      timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    },
    isFlagged: false,
  },
  {
    id: "chat_2",
    participants: ["user_3", "user_5"],
    messages: [
      {
        id: "msg_4",
        senderId: "user_3",
        text: "Love your art! Can you design something for my food blog?",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "msg_5",
        senderId: "user_5",
        text: "What's your budget?",
        timestamp: new Date(Date.now() - 110 * 60 * 1000).toISOString(),
      },
      {
        id: "msg_6",
        senderId: "user_3",
        text: "Around $200-300?",
        timestamp: new Date(Date.now() - 100 * 60 * 1000).toISOString(),
      },
    ],
    lastMessage: {
      id: "msg_6",
      senderId: "user_3",
      text: "Around $200-300?",
      timestamp: new Date(Date.now() - 100 * 60 * 1000).toISOString(),
    },
    isFlagged: false,
  },
  {
    id: "chat_3",
    participants: ["user_7", "user_10"],
    messages: [
      {
        id: "msg_7",
        senderId: "user_7",
        text: "Hey! Your outfit was so cute in that post",
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "msg_8",
        senderId: "user_10",
        text: "Thank you! Want to collab on something?",
        timestamp: new Date(Date.now() - 170 * 60 * 1000).toISOString(),
      },
    ],
    lastMessage: {
      id: "msg_8",
      senderId: "user_10",
      text: "Thank you! Want to collab on something?",
      timestamp: new Date(Date.now() - 170 * 60 * 1000).toISOString(),
    },
    isFlagged: false,
  },
  {
    id: "chat_4",
    participants: ["user_4", "user_6"],
    messages: [
      {
        id: "msg_9",
        senderId: "user_4",
        text: "Hey bro, you interested? Got the best prices on gear",
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "msg_10",
        senderId: "user_6",
        text: "What kind of gear? Cost?",
        timestamp: new Date(Date.now() - 230 * 60 * 1000).toISOString(),
      },
      {
        id: "msg_11",
        senderId: "user_4",
        text: "The good stuff. DM me for the catalog. Can ship discreet. $$$",
        timestamp: new Date(Date.now() - 220 * 60 * 1000).toISOString(),
      },
    ],
    lastMessage: {
      id: "msg_11",
      senderId: "user_4",
      text: "The good stuff. DM me for the catalog. Can ship discreet. $$$",
      timestamp: new Date(Date.now() - 220 * 60 * 1000).toISOString(),
    },
    isFlagged: true, // Flagged for suspicious selling language
  },
  {
    id: "chat_5",
    participants: ["user_8", "user_11"],
    messages: [
      {
        id: "msg_12",
        senderId: "user_8",
        text: "Yo! You wanna make quick cash? No questions asked",
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "msg_13",
        senderId: "user_11",
        text: "What are you talking about?",
        timestamp: new Date(Date.now() - 290 * 60 * 1000).toISOString(),
      },
      {
        id: "msg_14",
        senderId: "user_8",
        text: "Money moves. Just need your bank info and you're golden",
        timestamp: new Date(Date.now() - 280 * 60 * 1000).toISOString(),
      },
    ],
    lastMessage: {
      id: "msg_14",
      senderId: "user_8",
      text: "Money moves. Just need your bank info and you're golden",
      timestamp: new Date(Date.now() - 280 * 60 * 1000).toISOString(),
    },
    isFlagged: true, // Highly flagged for financial scam attempt
  },
  {
    id: "chat_6",
    participants: ["user_9", "user_10"],
    messages: [
      {
        id: "msg_15",
        senderId: "user_9",
        text: "Your styling is always fire 🔥",
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "msg_16",
        senderId: "user_10",
        text: "Thanks! Love your beats too!",
        timestamp: new Date(Date.now() - 350 * 60 * 1000).toISOString(),
      },
    ],
    lastMessage: {
      id: "msg_16",
      senderId: "user_10",
      text: "Thanks! Love your beats too!",
      timestamp: new Date(Date.now() - 350 * 60 * 1000).toISOString(),
    },
    isFlagged: false,
  },
]

// Flagging Keywords
export const flaggingKeywords = {
  drugs: ["weed", "cocaine", "heroin", "meth", "mdma", "lsd", "xanax", "percocet", "dm for", "discreet"],
  illegal_sales: [
    "quick cash",
    "easy money",
    "no questions",
    "bank info",
    "social security",
    "ssn",
    "make $",
    "guaranteed income",
  ],
  violence: ["beat", "kill", "stab", "shoot", "harm", "violence", "fight club"],
  fraud: [
    "guaranteed",
    "make money fast",
    "work from home",
    "click link",
    "starter kit",
    "limited time",
    "exclusive offer",
  ],
  explicit: ["xxx", "18+", "adult content"],
}

// Generate flags based on content
export function generateFlags(): Flag[] {
  const flags: Flag[] = []

  // Check posts for flagging
  dummyPosts.forEach((post) => {
    if (!post.isFlagged) return

    const postContent = (post.caption + " " + post.hashtags.join(" ")).toLowerCase()
    let detectedCategory: Flag["category"] = "other"
    const detectedKeywords: string[] = []
    let maxConfidence = 0

    Object.entries(flaggingKeywords).forEach(([category, keywords]) => {
      keywords.forEach((keyword) => {
        if (postContent.includes(keyword.toLowerCase())) {
          detectedKeywords.push(keyword)
          maxConfidence = Math.max(maxConfidence, 0.7 + Math.random() * 0.3)
          detectedCategory = category as Flag["category"]
        }
      })
    })

    if (detectedKeywords.length > 0) {
      flags.push({
        id: `flag_${post.id}`,
        type: "post",
        contentId: post.id,
        flagReason: `${detectedCategory.replace(/_/g, " ")} detected in caption`,
        keywords: [...new Set(detectedKeywords)],
        category: detectedCategory,
        confidence: maxConfidence,
        severity: maxConfidence > 0.85 ? "high" : maxConfidence > 0.65 ? "medium" : "low",
        timestamp: post.timestamp,
      })
    }
  })

  // Check chats for flagging
  dummyChats.forEach((chat) => {
    if (!chat.isFlagged) return

    const messageContent = chat.messages
      .map((m) => m.text)
      .join(" ")
      .toLowerCase()
    let detectedCategory: Flag["category"] = "other"
    const detectedKeywords: string[] = []
    let maxConfidence = 0

    Object.entries(flaggingKeywords).forEach(([category, keywords]) => {
      keywords.forEach((keyword) => {
        if (messageContent.includes(keyword.toLowerCase())) {
          detectedKeywords.push(keyword)
          maxConfidence = Math.max(maxConfidence, 0.7 + Math.random() * 0.3)
          detectedCategory = category as Flag["category"]
        }
      })
    })

    if (detectedKeywords.length > 0) {
      flags.push({
        id: `flag_${chat.id}`,
        type: "chat",
        contentId: chat.id,
        flagReason: `${detectedCategory.replace(/_/g, " ")} detected in messages`,
        keywords: [...new Set(detectedKeywords)],
        category: detectedCategory,
        confidence: maxConfidence,
        severity: maxConfidence > 0.85 ? "high" : maxConfidence > 0.65 ? "medium" : "low",
        timestamp: new Date().toISOString(),
      })
    }
  })

  return flags
}
