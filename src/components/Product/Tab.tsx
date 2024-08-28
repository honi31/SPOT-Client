import React from "react";
import { Tabs, Tab } from "@mui/material";

interface TabProps {
  selectedTab: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}

export default function TabComponent({
  selectedTab,
  setSelectedTab,
}: TabProps) {
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };

  return (
    <Tabs
      value={selectedTab}
      onChange={handleTabChange}
      TabIndicatorProps={{
        style: {
          backgroundColor: "#059669",
        },
      }}
    >
      <Tab
        label="팔래요"
        value="팔래요"
        sx={{
          color: selectedTab === "팔래요" ? "#059669 !important" : "gray",
          fontSize: "1.1rem",
        }}
      />
      <Tab
        label="살래요"
        value="살래요"
        sx={{
          color: selectedTab === "살래요" ? "#059669 !important" : "gray",
          fontSize: "1.1rem",
        }}
      />
    </Tabs>
  );
}
