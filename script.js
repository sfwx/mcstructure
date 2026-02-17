/*         FwX: EDITOR-NBT          */
/* Todos os direitos são reservados */
/* https://sfwx.github.io/copyright */

document.querySelector("[rel='icon']").href = "https://sfwx.github.io/image/icon/mcstructure.png";

function generateJson() {
  if (typeof itemJson !== "object") {
    alert("Não foi possível carregar itemJson.js");
    return;
  }
  const json = structuredClone(itemJson);
  const item = json.value.structure.value.entities.value.value[0];
  item.Item.value.Count.value = Math.min(Math.max(Number(document.getElementById("count").value), 1), 64);
  item.Item.value.Name.value = document.getElementById("itemId").value || "minecraft:diamond";
  if (document.getElementById("displayName").value.trim()) {
    item.Item.value.tag.value.display.value.Name.value = document.getElementById("displayName").value;
  }
  else {
    delete item.Item.value.tag.value.display.value.Name;
  }
  if (document.getElementById("lore").value.trim()) {
    item.Item.value.tag.value.display.value.Lore.value.value = document.getElementById("lore").value.trim().split("\n");
  }
  else {
    delete item.Item.value.tag.value.display.value.Lore;
  }
  if (!document.getElementById("displayName").value.trim() && !document.getElementById("lore").value.trim()) {
    delete item.Item.value.tag.value.display;
  }
  try {
    if (!document.getElementById("ench").value.trim()) {
delete item.Item.value.tag.value.ench;
    }
    else {
item.Item.value.tag.value.ench.value.value = JSON.parse(document.getElementById("ench").value);
if (!item.Item.value.tag.value.ench.value.value.length) {
  delete item.Item.value.tag.value.ench;
}
    }
  }
  catch {
    alert("Json de encantamentos inválido.");
    return;
  }
  if (!Number(document.getElementById("unbreakable").value)) {
    delete item.Item.value.tag.value.Unbreakable;
  }
  if (!item.Item.value.tag.value.display && !item.Item.value.tag.value.ench && !item.Item.value.tag.value.Unbreakable) {
    delete item.Item.value.tag;
  }
  if (document.getElementById("tags").value.trim()) {
    item.Tags.value.value = document.getElementById("tags").value.trim().split(", ");
  }
  else {
    delete item.Tags;
  }
  if (document.getElementById("customName").value.trim()) {
    item.CustomName.value = document.getElementById("customName").value;
  }
  else {
    delete item.CustomName;
  }
  const blob = new Blob(
    [JSON.stringify(json, null, 2)],
    { type: "application/json" }
  );
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = document.getElementById("itemId").value.replace("minecraft:", "") + ".json";
  a.click();
  URL.revokeObjectURL(url);
}

/* Todos os direitos são reservados */
/* https://sfwx.github.io/copyright */
