import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const name = searchParams.get("name")
    const location = searchParams.get("location")

    if (!name || !location) {
      return NextResponse.json({ error: "Business name and location are required" }, { status: 400 })
    }

    // Extended list of SEO headline templates
    const headlineTemplates = [
      `${name}: The ${location} Success Story Everyone's Talking About`,
      `How ${name} Became ${location}'s Most Trusted Business`,
      `${name} - Redefining Excellence in ${location}`,
      `The ${name} Phenomenon: Why ${location} Can't Stop Raving`,
      `${name}: Your Gateway to the Best ${location} Has to Offer`,
      `Breaking: ${name} Wins Hearts Across ${location}`,
      `${name} - The ${location} Business That's Changing Everything`,
      `Why ${name} is ${location}'s Rising Star in 2024`,
      `${name}: Where Innovation Meets Tradition in ${location}`,
      `The ${name} Revolution: Transforming ${location} One Customer at a Time`,
      `${name} - ${location}'s Answer to Quality and Service`,
      `Exclusive: How ${name} Conquered the ${location} Market`,
      `${name}: The ${location} Destination That Exceeds Expectations`,
      `Why Smart ${location} Residents Choose ${name} Every Time`,
      `${name} - Building Tomorrow's ${location} Today`,
      `The Ultimate ${name} Experience: ${location}'s Best-Kept Secret Revealed`,
      `${name}: Leading the Charge in ${location}'s Business Renaissance`,
      `How ${name} is Putting ${location} on the Map`,
      `${name} - Where ${location} Dreams Come True`,
      `The ${name} Advantage: What Sets This ${location} Business Apart`,
    ]

    // Simulate API processing delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    const randomHeadline = headlineTemplates[Math.floor(Math.random() * headlineTemplates.length)]

    return NextResponse.json({ headline: randomHeadline })
  } catch (error) {
    console.error("Error regenerating headline:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
