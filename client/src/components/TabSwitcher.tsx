"use client";
import React, { ComponentProps, useState } from "react";

const TabSwitcher = ({ children }: { children?: React.ReactNode }) => {
  const [activeTab, setActiveTab] = useState(0);

  const switchToTab = (index: number) => {
    setActiveTab(index);
  };

  const tabContents = React.Children.toArray(children)
    .filter((child) => React.isValidElement(child) && child.type === Tab)
    .map((child, index) => {
      const tabChild = child as React.ReactElement<any>;

      return React.cloneElement(tabChild, {
        index,
        children: React.cloneElement(
          tabChild.props.children as React.ReactElement<ComponentProps<any>>,
          {
            style: { display: activeTab === index ? "flex" : "none" },
            switchToTab: (x: number) => switchToTab(x),
          }
        ),
      });
    });

  return <>{tabContents}</>;
};

type TabProps = {
  children: React.ReactNode;
};

const Tab = ({ children }: TabProps) => {
  return <>{children}</>;
};

TabSwitcher.Tab = Tab;

export default TabSwitcher;
