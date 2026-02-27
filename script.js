/*         FwX: EDITOR-NBT          */
/* Todos os direitos são reservados */
/* https://sfwx.github.io/copyright */

document.querySelector("[rel='icon']").href = "https://sfwx.github.io/image/icon/mcstructure.png";

fwx.log("info", "Pronto para execução.");

fwx.item.build = function () {
  if (typeof this.template !== "object") {
    fwx.log("error", "Não foi possível carregar item.js", true);
    return;
  }
  fwx.log("info", "Clonando estrutura JSON do Item..");
  this.json = structuredClone(this.template);
  const item = this.json.value.structure.value.entities.value.value[0];
  fwx.log("info", "Atualizando informações da estrutura..");
  item.Item.value.Count.value = Math.min(Math.max(Number(document.getElementById("fwxCount").value), 1), 64);
  item.Item.value.Damage.value = Math.max(Number(document.getElementById("fwxDamage").value), 0);
  item.Item.value.Name.value = document.getElementById("fwxItemId").value || "minecraft:diamond";
  if (document.getElementById("fwxDisplayName").value.trim()) {
    item.Item.value.tag.value.display.value.Name.value = document.getElementById("fwxDisplayName").value;
  }
  else {
    delete item.Item.value.tag.value.display.value.Name;
    fwx.log("warn", "\"Display Name\" removido por estar indefinido.");
  }
  if (document.getElementById("fwxLore").value.trim()) {
    item.Item.value.tag.value.display.value.Lore.value.value = document.getElementById("fwxLore").value.trim().split("\n");
  }
  else {
    delete item.Item.value.tag.value.display.value.Lore;
    fwx.log("warn", "\"Display Lore\" removido por estar indefinido.");
  }
  if (!document.getElementById("fwxDisplayName").value.trim() && !document.getElementById("fwxLore").value.trim()) {
    delete item.Item.value.tag.value.display;
  }
  try {
    if (!document.getElementById("fwxEnch").value.trim()) {
      delete item.Item.value.tag.value.ench;
      fwx.log("warn", "\"Ench\" removido por estar indefinido.");
    }
    else {
      item.Item.value.tag.value.ench.value.value = JSON.parse(document.getElementById("fwxEnch").value);
      if (!item.Item.value.tag.value.ench.value.value.length) {
        delete item.Item.value.tag.value.ench;
        fwx.log("warn", "\"Ench\" removido por estar indefinido.");
      }
    }
  }
  catch {
    fwx.log("warn", "O seu JSON de encantamentos esta inválido.", true);
    return;
  }
  if (!Number(document.getElementById("fwxUnbreakable").value)) {
    delete item.Item.value.tag.value.Unbreakable;
    fwx.log("warn", "\"Unbreakable\" removido por estar indefinido.");
  }
  if (!item.Item.value.tag.value.display && !item.Item.value.tag.value.ench && !item.Item.value.tag.value.Unbreakable) {
    delete item.Item.value.tag;
    fwx.log("warn", "\"Tag\" removido por estar indefinido.");
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
    fwx.log("warn", "\"Custom Name\" removido por estar indefinido.");
  }
  fwx.log("success", "Nova estrutura JSON gerada com sucesso.");
  return this.json;
}
fwx.item.submit = function () {
  fwx.item.result = fwx.item.build();
  if (fwx.item.result !== undefined) {
    fwx.log("info", "Solicitando clipboard do navegador..");
    navigator.clipboard.writeText(JSON.stringify(fwx.item.result));
    document.getElementById("fwxConsole").innerHTML += "\n<span data-fwx class="info">---------------------------------------------------------------</span>";    
  }
}

/* Todos os direitos são reservados */
/* https://sfwx.github.io/copyright */
