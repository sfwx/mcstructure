/*         FwX: EDITOR-NBT          */
/* Todos os direitos são reservados */
/* https://sfwx.github.io/copyright */

document.querySelector("[rel='icon']").href = "https://sfwx.github.io/image/icon/mcstructure.png";

fwx.log("info", "Aguardando arquivo...");

fwx.item.build = function () {
  if (typeof this.template !== "object") {
    fwx.log("error", "Não foi possível carregar item.js", true);
    return;
  }
  fwx.log("info", "Clonando estrutura JSON do item..");
  this.json = structuredClone(this.template);
  const item = this.json.value.structure.value.entities.value.value[0];
  fwx.log("info", "Gerando nova estrutura JSON com valores atualizados..");
  item.Item.value.Count.value = Math.min(Math.max(Number(document.getElementById("fwxCount").value), 1), 64);
  item.Item.value.Damage.value = Math.max(Number(document.getElementById("fwxDamage").value), 0);
  item.Item.value.Name.value = document.getElementById("fwxItemId").value || "minecraft:diamond";
  if (document.getElementById("fwxDisplayName").value.trim()) {
    item.Item.value.tag.value.display.value.Name.value = document.getElementById("fwxDisplayName").value;
  }
  else {
    delete item.Item.value.tag.value.display.value.Name;
    fwx.log("warn", "\"Display Name\" foi removido da estrutura.");
  }
  if (document.getElementById("fwxLore").value.trim()) {
    item.Item.value.tag.value.display.value.Lore.value.value = document.getElementById("fwxLore").value.trim().split("\n");
  }
  else {
    delete item.Item.value.tag.value.display.value.Lore;
    fwx.log("warn", "\"Display Lore\" foi removido da estrutura.");
  }
  if (!document.getElementById("fwxDisplayName").value.trim() && !document.getElementById("fwxLore").value.trim()) {
    delete item.Item.value.tag.value.display;
    fwx.log("warn", "\"Display\" foi removido por !!!!!.");
  }
  try {
    if (!document.getElementById("fwxEnch").value.trim()) {
      delete item.Item.value.tag.value.ench;
      fwx.log("warn", "\"Ench\" foi removido por !!!!!.");
    }
    else {
      item.Item.value.tag.value.ench.value.value = JSON.parse(document.getElementById("fwxEnch").value);
      if (!item.Item.value.tag.value.ench.value.value.length) {
        delete item.Item.value.tag.value.ench;
        fwx.log("warn", "\"Ench\" foi removido por !!!!!.");
      }
    }
  }
  catch {
    fwx.log("warn", "Json de encantamentos inválido.", true);
    return;
  }
  if (!Number(document.getElementById("fwxUnbreakable").value)) {
    delete item.Item.value.tag.value.Unbreakable;
    fwx.log("warn", "\"Unbreakable\" foi removido por !!!!!.");
  }
  if (!item.Item.value.tag.value.display && !item.Item.value.tag.value.ench && !item.Item.value.tag.value.Unbreakable) {
    delete item.Item.value.tag;
    fwx.log("warn", "\"Tag\" foi removido por !!!!!.");
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
    fwx.log("warn", "\"Custom Name\" foi removido por !!!!!.");
  }
  return this.json;
}

/* Todos os direitos são reservados */
/* https://sfwx.github.io/copyright */
