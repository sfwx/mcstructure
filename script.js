/*         FwX: EDITOR-NBT          */
/* Todos os direitos são reservados */
/* https://sfwx.github.io/copyright */

document.querySelector("[rel='icon']").href = "https://sfwx.github.io/image/icon/mcstructure.png";

fwx.item.build = function () {
  if (typeof this.item.template !== "object") {
    fwx.log("error", "Não foi possível carregar item.js", true);
    return;
  }
  const fwx.item.json = structuredClone(this.item.template);
  const item = fwx.item.json.value.structure.value.entities.value.value[0];
  item.Item.value.Count.value = Math.min(Math.max(Number(document.getElementById("fwxCount").value), 1), 64);
  item.Item.value.Name.value = document.getElementById("fwxItemId").value || "minecraft:diamond";
  if (document.getElementById("fwxDisplayName").value.trim()) {
    item.Item.value.tag.value.display.value.Name.value = document.getElementById("fwxDisplayName").value;
  }
  else {
    delete item.Item.value.tag.value.display.value.Name;
  }
  if (document.getElementById("fwxLore").value.trim()) {
    item.Item.value.tag.value.display.value.Lore.value.value = document.getElementById("fwxLore").value.trim().split("\n");
  }
  else {
    delete item.Item.value.tag.value.display.value.Lore;
  }
  if (!document.getElementById("fwxDisplayName").value.trim() && !document.getElementById("fwxLore").value.trim()) {
    delete item.Item.value.tag.value.display;
  }
  try {
    if (!document.getElementById("fwxEnch").value.trim()) {
delete item.Item.value.tag.value.ench;
    }
    else {
item.Item.value.tag.value.ench.value.value = JSON.parse(document.getElementById("fwxEnch").value);
if (!item.Item.value.tag.value.ench.value.value.length) {
  delete item.Item.value.tag.value.ench;
}
    }
  }
  catch {
    fwx.log("warn", "Json de encantamentos inválido.", true);
    return;
  }
  if (!Number(document.getElementById("fwxUnbreakable").value)) {
    delete item.Item.value.tag.value.Unbreakable;
  }
  if (!item.Item.value.tag.value.display && !item.Item.value.tag.value.ench && !item.Item.value.tag.value.Unbreakable) {
    delete item.Item.value.tag;
  }
  if (document.getElementById("fwxTags").value.trim()) {
    item.Tags.value.value = document.getElementById("fwxTags").value.trim().split(", ");
  }
  else {
    item.Tags.value.value = [ "FwX404" ];
  }
  if (document.getElementById("fwxCustomName").value.trim()) {
    item.CustomName.value = document.getElementById("fwxCustomName").value;
  }
  else {
    delete item.CustomName;
  }
  return fwx.item.json;
}

/* Todos os direitos são reservados */
/* https://sfwx.github.io/copyright */
