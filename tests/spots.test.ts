import { test } from "node:test";
import assert from "node:assert/strict";
import { filterSpots, spots } from "../src/data/spots";

test("the guide includes real destinations in all three categories", () => {
  assert.equal(new Set(spots.map((spot) => spot.id)).size, spots.length);
  assert.equal(spots.length, 12);
  assert.deepEqual(
    ["sightseeing", "food", "onsen"].map(
      (category) => spots.filter((spot) => spot.category === category).length,
    ),
    [6, 3, 3],
  );
  for (const spot of spots) {
    assert.equal(spot.prefecture, "aomori");
    assert.ok(spot.coordinates[0] > 139.5 && spot.coordinates[0] < 141.8);
    assert.ok(spot.coordinates[1] > 40.2 && spot.coordinates[1] < 41.6);
    assert.equal(new URL(spot.officialUrl).protocol, "https:");
  }
});

test("category, area, search, and saved filters work together", () => {
  const result = filterSpots(spots, {
    category: "food",
    area: "十和田・八甲田",
    query: "つた",
    savedOnly: true,
    savedIds: ["tsuta"],
  });
  assert.equal(result.length, 0);
  const matched = filterSpots(spots, {
    category: "onsen",
    area: "十和田・八甲田",
    query: "つた",
    savedOnly: true,
    savedIds: ["tsuta", "furofushi"],
  });
  assert.deepEqual(
    matched.map((spot) => spot.id),
    ["tsuta"],
  );
});

test("search handles whitespace, reading, and place names", () => {
  assert.deepEqual(
    filterSpots(spots, {
      category: "all",
      area: "",
      query: "  おいらせ  ",
    }).map((spot) => spot.id),
    ["oirase"],
  );
  assert.deepEqual(
    filterSpots(spots, { category: "all", area: "", query: "八戸" }).map(
      (spot) => spot.id,
    ),
    ["minato"],
  );
  assert.equal(
    filterSpots(spots, { category: "all", area: "", query: "該当しない場所" })
      .length,
    0,
  );
  assert.equal(
    filterSpots(spots, { category: "all", area: "", query: "  " }).length,
    spots.length,
  );
});

test("saved-only view is empty when nothing is saved and never mutates source data", () => {
  const sourceOrder = spots.map((spot) => spot.id);
  assert.equal(
    filterSpots(spots, {
      category: "all",
      area: "",
      query: "",
      savedOnly: true,
      savedIds: [],
    }).length,
    0,
  );
  filterSpots(spots, { category: "all", area: "", query: "" }).sort((a, b) =>
    a.name.localeCompare(b.name),
  );
  assert.deepEqual(
    spots.map((spot) => spot.id),
    sourceOrder,
  );
});
