import { type NextRequest, NextResponse } from "next/server"

interface BusinessRequest {
  name: string
  location: string
}

// Simulated data for different business types and locations
const generateBusinessData = (name: string, location: string) => {
  // Generate a realistic rating between 3.8 and 4.9
  const rating = Math.round((Math.random() * 1.1 + 3.8) * 10) / 10

  // Generate review count between 50 and 500
  const reviews = Math.floor(Math.random() * 450) + 50

  // Generate SEO headlines based on business name and location
  const headlines = [
    `Why ${name} is ${location}'s Best-Kept Secret in 2024`,
    `${name}: The Ultimate ${location} Experience You've Been Missing`,
    `Discover Why ${name} is Taking ${location} by Storm`,
    `${name} - ${location}'s Premier Destination for Excellence`,
    `The Complete Guide to ${name}: ${location}'s Hidden Gem`,
    `${name} Revolutionizes the ${location} Scene - Here's How`,
    `Why Locals Choose ${name} Over Any Other ${location} Business`,
    `${name}: Setting New Standards in ${location} Since 2024`,
    `The ${name} Difference: What Makes This ${location} Business Special`,
    `${name} - Where Quality Meets Excellence in ${location}`,
  ]

  const randomHeadline = headlines[Math.floor(Math.random() * headlines.length)]

  return {
    rating,
    reviews,
    headline: randomHeadline,
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: BusinessRequest = await request.json()

    // Validate required fields
    if (!body.name || !body.location) {
      return NextResponse.json({ error: "Business name and location are required" }, { status: 400 })
    }

    // Simulate API processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const businessData = generateBusinessData(body.name.trim(), body.location.trim())

    return NextResponse.json(businessData)
  } catch (error) {
    console.error("Error processing business data request:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
