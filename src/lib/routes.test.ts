import { describe, expect, it } from "vitest";

import { getRouteNodeByUri, routes, SidebarContentType } from "./routes";

describe("routes", () => {
  describe("SidebarContentType", () => {
    it("should have expected values", () => {
      expect(SidebarContentType.NAV_MAIN_ROOT).toBe("NAV_MAIN_ROOT");
      expect(SidebarContentType.NAV_MAIN_ITEM).toBe("NAV_MAIN_ITEM");
      expect(SidebarContentType.NAV_SECONDARY_ITEM).toBe("NAV_SECONDARY_ITEM");
    });
  });

  describe("routes object structure", () => {
    it("should have a defined root route", () => {
      expect(routes["/"]).toBeDefined();
      expect(routes["/"].uri).toBe("/");
      expect(routes["/"].title).toBe("Municipal Services");
    });

    it("should have expected top-level routes", () => {
      expect(routes["/about-author"]).toBeDefined();
      expect(routes["/about-project"]).toBeDefined();
      expect(routes["/areas"]).toBeDefined();
      expect(routes["/sign-in"]).toBeDefined();
      expect(routes["/sign-up"]).toBeDefined();
    });

    it("should have correct sidebarContent types for relevant routes", () => {
      expect(routes["/about-author"]?.sidebarContent).toBe(
        SidebarContentType.NAV_SECONDARY_ITEM
      );
      expect(routes["/about-project"]?.sidebarContent).toBe(
        SidebarContentType.NAV_SECONDARY_ITEM
      );
      expect(routes["/areas"]?.sidebarContent).toBe(
        SidebarContentType.NAV_MAIN_ROOT
      );
    });

    it("should have nested children for '/areas'", () => {
      expect(routes["/areas"]?.children).toBeDefined();
      expect(routes["/areas"]?.children?.["/areas/admin"]).toBeDefined();
      expect(routes["/areas"]?.children?.["/areas/gov"]).toBeDefined();
      expect(routes["/areas"]?.children?.["/areas/personal"]).toBeDefined();
    });

    it("should have deeply nested children for '/areas/gov'", () => {
      const govArea = routes["/areas"]?.children?.["/areas/gov"];
      expect(govArea).toBeDefined();
      expect(govArea?.children?.["/areas/gov/finance"]).toBeDefined();
      expect(govArea?.children?.["/areas/gov/public-services"]).toBeDefined();
    });
  });

  describe("getRouteNodeByUri", () => {
    it("should return the root route for '/'", () => {
      const root = getRouteNodeByUri("/");
      expect(root).toBe(routes["/"]);
    });

    it("should return a top-level route", () => {
      const aboutAuthor = getRouteNodeByUri("/about-author");
      expect(aboutAuthor).toBe(routes["/about-author"]);
    });

    it("should return a nested route", () => {
      const adminArea = getRouteNodeByUri("/areas/admin");
      expect(adminArea).toBe(routes["/areas"]?.children?.["/areas/admin"]);
    });

    it("should return a deeply nested route", () => {
      const financeArea = getRouteNodeByUri("/areas/gov/finance");
      expect(financeArea).toBe(
        routes["/areas"]?.children?.["/areas/gov"]?.children?.[
          "/areas/gov/finance"
        ]
      );
    });

    it("should throw an error for a non-existent top-level route", () => {
      expect(() => getRouteNodeByUri("/non-existent")).toThrow(
        "Route node not found for URI: /non-existent"
      );
    });

    it("should throw an error for a non-existent nested route", () => {
      expect(() => getRouteNodeByUri("/areas/non-existent")).toThrow(
        "Route node not found for URI: /areas/non-existent"
      );
    });

    it("should throw an error for a malformed URI", () => {
      expect(() => getRouteNodeByUri("invalid-uri")).toThrow(
        "Route node not found for URI: invalid-uri"
      );
    });

    it("should throw an error for a partial URI that is not a full node", () => {
      expect(() => getRouteNodeByUri("/areas/gov")).not.toThrow(); // /areas/gov is a valid node
      expect(getRouteNodeByUri("/areas/gov")).toBeDefined();
    });
  });
});
