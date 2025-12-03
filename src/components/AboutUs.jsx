import React from "react";

export default function AboutStructured({ className = "" }) {
  const items = [
    {
      id: 0,
      label: "About us",
      title: "AfricaMed Business Forum",
      summary:
        "AfricaMed Business Forum: A Continental Platform for Investment and Impact Since its creation, the AfricaMed Business Forum has established itself as the leading African economic meeting point, bringing together governments, investors, companies, institutions, researchers, and experts around a common goal: to accelerate Africa’s structural transformation through productive investment and South South cooperation."
    },
    {
      id: 1,
      label: "2023",
      title: "1st edition Tangier",
      summary:
        "1st edition Tangier 2023 launch of the concept with more than 300 leaders and 50 investment projects presented."
    },
    {
      id: 2,
      label: "2025",
      title: "2nd edition Casablanca",
      summary:
        "2nd edition Casablanca 2025 consolidation of the model with 200 qualified participants and 65 countries represented and the launch of Club AfricaMed a permanent economic community."
    },
    {
      id: 3,
      label: "2026",
      title: "3rd edition Casablanca",
      summary:
        "3rd edition Casablanca 2026 a strategic turning point placing sport at the center as a driver of industrialization cohesion and the continent’s economic transformation."
    }
  ];

  const anchorPositions = [0.12, 0.36, 0.6, 0.84];

  const sectionStyle = {
    paddingTop: 24,
    paddingBottom: 24,
    paddingLeft: 24,
    paddingRight: 24,
    background: "linear-gradient(to bottom, #0f172a, rgba(132,87,17,0.04), #0f172a)",
    color: "#ffffff"
  };

  const containerStyle = {
    maxWidth: 880,
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    gap: 12,
    alignItems: "flex-start"
  };

  const leftColStyle = {
    flexBasis: "28%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start"
  };

  const titleStyle = {
    fontWeight: 800,
    fontSize: 40,
    lineHeight: 1.05,
    marginBottom: 8
  };

  const timelineWrapStyle = {
    position: "relative",
    width: "100%",
    height: 360,
    marginTop: 6
  };

  const railStyle = {
    position: "absolute",
    left: 40,
    top: 8,
    bottom: 8,
    width: 10,
    borderRadius: 8,
    backgroundColor: "rgba(161,98,5,0.85)"
  };

  const anchorBaseStyle = {
    position: "absolute",
    left: 12,
    transform: "translateY(-50%)",
    width: 34,
    height: 34,
    borderRadius: "50%",
    backgroundColor: "#f6c365",
    border: "3px solid #000000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  };

  const rightColStyle = {
    flexBasis: "72%",
    position: "relative"
  };

  const listGridStyle = {
    display: "grid",
    gridTemplateRows: "repeat(4, auto)",
    gap: 8
  };

  const itemWrapStyle = {
    display: "flex",
    alignItems: "flex-start"
  };

  const spacerStyle = {
    width: 12,
    flexShrink: 0
  };

  const cardStyle = {
    borderRadius: 12,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 14,
    paddingRight: 14,
    boxShadow: "0 6px 16px rgba(2,6,23,0.6)",
    background: "linear-gradient(90deg, rgba(0,0,0,0.45), rgba(132,87,17,0.06))"
  };

  const labelBlockStyle = {
    minWidth: 130
  };

  const labelStyle = {
    fontSize: 20,
    fontWeight: 800,
    lineHeight: 1.1,
    color: "rgba(255,255,255,0.95)"
  };

  const titleStyleSmall = {
    marginTop: 6,
    fontSize: 16,
    fontWeight: 600,
    color: "#f6c365"
  };

  const summaryStyle = {
    color: "rgba(203,213,225,1)",
    fontSize: 14,
    lineHeight: 1.55
  };

  const bottomTextStyle = {
    marginTop: 12,
    color: "rgba(203,213,225,1)",
    fontSize: 14,
    lineHeight: 1.55
  };

  return (
    <section id="about" style={sectionStyle} className={className}>
      <div style={containerStyle}>
        <div style={leftColStyle}>
          <h2 style={titleStyle}>
            <span style={{ display: "block" }}>About</span>
            <span style={{ display: "block" }}>Us</span>
          </h2>

          <div style={timelineWrapStyle}>
            <div style={railStyle} />

            {anchorPositions.map((pos, idx) => {
              const topPercent = `${pos * 100}%`;
              return (
                <div key={idx} style={{ ...anchorBaseStyle, top: topPercent }}>
                  <div style={{ width: 18, height: 18, borderRadius: "50%", backgroundColor: "transparent" }} />
                </div>
              );
            })}
          </div>
        </div>

        <div style={rightColStyle}>
          <div style={listGridStyle}>
            {items.map((it) => (
              <div key={it.id} style={itemWrapStyle}>
                <div style={spacerStyle} />

                <div style={{ flex: 1 }}>
                  <div style={cardStyle}>
                    <div style={{ display: "flex", gap: 12 }}>
                      <div style={labelBlockStyle}>
                        <div style={labelStyle}>{it.label}</div>
                        <div style={titleStyleSmall}>{it.title}</div>
                      </div>

                      <div style={summaryStyle}>
                        <p style={{ margin: 0 }}>{it.summary}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={bottomTextStyle}>
            <p style={{ margin: 0 }}>
              This third edition takes place in an exceptional context Morocco host country of the 2026 Africa Cup of Nations AFCON and cohost of the 2030 FIFA World Cup with Spain and Portugal This alignment positions the Kingdom as a continental capital of sports and South South cooperation offering a symbolic and strategic framework that highlights sports as a continental driver of growth investment and international influence
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
