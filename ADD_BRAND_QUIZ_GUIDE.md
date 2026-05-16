# 📚 How to Add New Brands & Quizzes

## 🏢 Step 1: Add a New Brand to the System

### Location 1: `client/src/pages/Home.jsx` (Featured Brands)

```javascript
// Around line 30-50, in the featuredBrands array, ADD:

{
  id: "urbanic",                    // Unique lowercase ID (use in URLs)
  name: "URBANIC",                  // Display name
  tag: "Modern Style",              // Tagline
  img: "/brands/urbanic.jpg",       // Image path in public/brands/
  icon: <ShoppingBag size={40} strokeWidth={1} />,  // Icon from lucide-react
  accent: "group-hover:shadow-purple-500/40",      // Hover shadow color
},
```

### Location 2: `client/src/pages/Nexus.jsx` (Brand Directory)

```javascript
// Around line 30-45, in the allBrands array, ADD:

{ 
  id: "urbanic", 
  name: "URBANIC", 
  cat: "Fashion Node",        // Must match a category
  img: "/brands/urbanic.jpg", 
  status: "Active"            // Status: Active, New, Trending, etc
},
```

### Location 3: `client/src/pages/QuizRoom.jsx` (Theme Colors)

```javascript
// Around line 50-55, in the themes object, ADD:

urbanic: { 
  color: "#a855f7",                    // Hex color code
  bg: "bg-purple-500", 
  border: "border-purple-500/30" 
},
```

---

## 📝 Step 2: Add Quiz Questions for the Brand

### Location: `client/src/pages/QuizRoom.jsx`

```javascript
// Around line 60-65, in the quizData array, modify/ADD:

const quizData = [
  { 
    q: "What is URBANIC's core value?", 
    options: ["Sustainability", "Innovation", "Style", "Quality"] 
  },
  { 
    q: "In which year was URBANIC founded?", 
    options: ["2015", "2018", "2020", "2022"] 
  },
  { 
    q: "Which material does URBANIC use?", 
    options: ["Organic Cotton", "Synthetic", "Wool", "Linen"] 
  }
];
```

---

## 🖼️ Step 3: Add Brand Image

1. Go to: `client/public/brands/`
2. Add your image file: `urbanic.jpg` (or .png)
3. Image size: **800x600px recommended**

---

## 🎨 Step 4: Add Navbar Category (Optional)

### Location: `client/src/pages/Nexus.jsx`

```javascript
// Around line 10-15, in the categories array, ADD:

{ name: "Lifestyle Node", icon: <HeartHandshake size={16}/> },
```

Then update your brand's `cat` to match: `"Lifestyle Node"`

---

## 📊 Step 5: Add to Database (Backend - For Later)

### Location: `server/models/Brand.js`

Already has the structure to store quizzes:

```javascript
const BrandSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    image: String,
    accentColor: String,
    quizzes: [{
        question: String,
        options: [String],
        correctAnswer: Number  // Index of correct option (0-3)
    }]
});
```

---

## ✅ Complete Example: Adding "NOVA" Brand

### 1. Add to Home.jsx:
```javascript
{
  id: "nova",
  name: "NOVA",
  tag: "Space Technology",
  img: "/brands/nova.jpg",
  icon: <Rocket size={40} strokeWidth={1} />,
  accent: "group-hover:shadow-cyan-500/40",
}
```

### 2. Add to Nexus.jsx:
```javascript
{ id: "nova", name: "NOVA", cat: "Cyber Node", img: "/brands/nova.jpg", status: "Trending" }
```

### 3. Add theme in QuizRoom.jsx:
```javascript
nova: { color: "#06b6d4", bg: "bg-cyan-500", border: "border-cyan-500/30" }
```

### 4. Add quiz (QuizRoom.jsx):
```javascript
{ q: "What does NOVA specialize in?", options: ["AI", "Space", "Web", "Mobile"] },
{ q: "NOVA's headquarters is in?", options: ["Dubai", "Singapore", "Tokyo", "Berlin"] },
{ q: "NOVA's mission is to?", options: ["Innovate", "Dominate", "Educate", "Integrate"] }
```

---

## 🚀 Quick Summary

To add a brand named **"PARKOUR"**:

1. **Home.jsx** → Add to `featuredBrands` array
2. **Nexus.jsx** → Add to `allBrands` array  
3. **QuizRoom.jsx** → Add theme color + quiz questions
4. **public/brands/** → Add `parkour.jpg` image

Done! ✅

---

## 🔗 File Locations Reference

| What | File | Line ~  |
|------|------|--------|
| Featured Brands | `client/src/pages/Home.jsx` | 30 |
| All Brands Directory | `client/src/pages/Nexus.jsx` | 30 |
| Theme Colors | `client/src/pages/QuizRoom.jsx` | 50 |
| Quiz Questions | `client/src/pages/QuizRoom.jsx` | 62 |
| Brand Images | `client/public/brands/` | - |
