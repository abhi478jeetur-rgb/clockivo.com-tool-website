import { NextRequest, NextResponse } from "next/server"

const INDEXNOW_KEY = "a6d510c85c2c4dfdbbc2df600b3e6481"
const HOST = "www.clockivo.com"
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get("url")
  const token = searchParams.get("token")

  // Simple token authorization or development check
  if (token !== INDEXNOW_KEY && process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Unauthorized access token" }, { status: 401 })
  }

  if (!url) {
    return NextResponse.json({ error: "Missing 'url' query parameter" }, { status: 400 })
  }

  try {
    const response = await fetch("https://api.indexnow.org/IndexNow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        host: HOST,
        key: INDEXNOW_KEY,
        keyLocation: KEY_LOCATION,
        urlList: [url],
      }),
    })

    if (response.status === 200 || response.status === 202) {
      return NextResponse.json({
        success: true,
        message: `Successfully submitted URL: ${url} to IndexNow`,
        status: response.status,
      })
    } else {
      const text = await response.text()
      return NextResponse.json({
        success: false,
        error: `IndexNow returned status ${response.status}`,
        details: text,
      }, { status: response.status })
    }
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || "Failed to submit to IndexNow",
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { urls, token } = body

    if (token !== INDEXNOW_KEY && process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: "Unauthorized access token" }, { status: 401 })
    }

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json({ error: "Missing or invalid 'urls' array in body" }, { status: 400 })
    }

    const response = await fetch("https://api.indexnow.org/IndexNow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        host: HOST,
        key: INDEXNOW_KEY,
        keyLocation: KEY_LOCATION,
        urlList: urls,
      }),
    })

    if (response.status === 200 || response.status === 202) {
      return NextResponse.json({
        success: true,
        message: `Successfully submitted ${urls.length} URLs to IndexNow`,
        status: response.status,
      })
    } else {
      const text = await response.text()
      return NextResponse.json({
        success: false,
        error: `IndexNow returned status ${response.status}`,
        details: text,
      }, { status: response.status })
    }
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || "Failed to submit to IndexNow",
    }, { status: 500 })
  }
}
