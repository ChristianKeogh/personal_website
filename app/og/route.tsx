import { ImageResponse } from "next/og";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "Christian Keogh";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#000",
          color: "#fff",
          padding: "80px"
        }}
      >
        <div style={{ fontSize: 28, color: "#a3a3a3", marginBottom: 24 }}>
          christiankeogh.com
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 600,
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
            maxWidth: 1000
          }}
        >
          {title}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630
    }
  );
}
