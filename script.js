/*         FwX: EDITOR-NBT          */
/* Todos os direitos são reservados */
/* https://sfwx.github.io/copyright */


document.querySelector("[rel='icon']").href = "https://sfwx.github.io/image/icon/mcstructure.png";

function onloadBundle() {
  // 1. Tenta encontrar o Buffer (o unpkg geralmente coloca em window.Buffer ou window.buffer)
  window.Buffer = window.Buffer || (window.buffer ? window.buffer.Buffer : null);

  // 2. Verifica se a biblioteca NBT foi carregada
  // O bundle.run pode expor como 'nbt' ou 'prismarineNbt'
  const nbtLib = window.nbt || window.prismarineNbt;

  if (window.Buffer && nbtLib) {
    console.log("FwX: Dependências carregadas com sucesso.");
    document.getElementById("fwxButton").disabled = false;
    document.getElementById("fwxButton").innerText = "Save .mcstructure";
  } else {
    // Se falhar, tentamos de novo em 500ms (re-check)
    setTimeout(onloadBundle, 500);
  }
}

function generateJson() {
  if (typeof itemJson !== "object") {
    alert("Não foi possível carregar item.js");
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
    item.Tags.value.value = [ "FwX404" ];
  }
  if (document.getElementById("customName").value.trim()) {
    item.CustomName.value = document.getElementById("customName").value;
  }
  else {
    delete item.CustomName;
  }
  return json;
}

async function downloadItem() {
  const jsonData = generateJson();
  if (!jsonData) return;

  // Identifica qual variável global a lib usou
  const nbtLib = window.nbt || window.prismarineNbt;

  if (!nbtLib) {
    alert("Biblioteca NBT não encontrada. Aguarde o carregamento.");
    return;
  }

  try {
    // O Minecraft Bedrock usa Little Endian para .mcstructure
    const nbtBuffer = await nbtLib.writeUncompressed(jsonData, 'little');

    const blob = new Blob([nbtBuffer], { type: "application/octet-stream" });
    const fileName = (document.getElementById("itemId").value.split(":")[1] || "item") + ".mcstructure";

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    
    URL.revokeObjectURL(url);
    
  } catch (error) {
    console.error("Erro na conversão NBT:", error);
    alert("Erro ao converter para binário. Verifique se o JSON de encantamentos está no formato correto.");
  }
}

/* Todos os direitos são reservados */
/* https://sfwx.github.io/copyright */
