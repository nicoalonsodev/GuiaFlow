import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const nombre = searchParams.get("nombre");

    if (!id || !nombre) {
      return NextResponse.json(
        { error: "Faltan parámetros: id y nombre son obligatorios." },
        { status: 400 }
      );
    }

    const baseUrl = "https://tecnicocerca.com/api/getProduct?user_type=admin";
    
    // Opciones POST sin body
    const fetchOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: null
    };

    let products = [];

    // 1) Buscar por filter_name
    const urlName = `${baseUrl}&store_id=${id}&filter_name=${encodeURIComponent(nombre)}`;
    const resName = await fetch(urlName, fetchOptions);
    const dataName = await resName.json();

    if (dataName.products && dataName.products.length > 0) {
      products = dataName.products;
    } else {
      // 2) Si no hay, buscar por filter_part
      const urlPart = `${baseUrl}&store_id=${id}&filter_part=${encodeURIComponent(nombre)}`;
      const resPart = await fetch(urlPart, fetchOptions);
      const dataPart = await resPart.json();

      if (dataPart.products && dataPart.products.length > 0) {
        products = dataPart.products;
      }
    }

    return NextResponse.json({ products }, { status: 200 });

  } catch (error) {
    console.error("Error en búsqueda de productos:", error);
    return NextResponse.json(
      { error: "Error al buscar productos en la API externa." },
      { status: 500 }
    );
  }
}
