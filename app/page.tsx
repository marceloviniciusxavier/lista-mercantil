"use client";

import { FormEvent, useState } from "react";

type ItemMercantil = {
  id: number;
  nome: string;
  comprado: boolean;
};

export default function Home() {
  const [nomeItem, setNomeItem] = useState("");
  const [itens, setItens] = useState<ItemMercantil[]>([]);

  function adicionarItem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (nomeItem.trim() === "") {
      alert("Digite o nome de um item.");
      return;
    }

    const novoItem: ItemMercantil = {
      id: Date.now(),
      nome: nomeItem,
      comprado: false,
    };

    setItens([...itens, novoItem]);
    setNomeItem("");
  }

  function marcarComoComprado(id: number) {
    const novaLista = itens.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          comprado: !item.comprado,
        };
      }

      return item;
    });

    setItens(novaLista);
  }

  function removerItem(id: number) {
    const novaLista = itens.filter((item) => item.id !== id);

    setItens(novaLista);
  }

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10">
      <section className="mx-auto max-w-xl rounded-2xl bg-white p-6 shadow">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Lista do Mercantil
        </h1>

        <p className="mb-6 text-gray-600">
          Adicione os itens que precisam ser comprados.
        </p>

        <form onSubmit={adicionarItem} className="mb-6 flex gap-2">
          <input
            type="text"
            value={nomeItem}
            onChange={(event) => setNomeItem(event.target.value)}
            placeholder="Ex: detergente, arroz, feijão..."
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-900 outline-none focus:border-blue-500"
          />

          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
          >
            Adicionar
          </button>
        </form>

        <div className="mb-4 rounded-lg bg-gray-50 p-3 text-sm text-gray-700">
          Total de itens: <strong>{itens.length}</strong>
        </div>

        {itens.length === 0 ? (
          <p className="rounded-lg border border-dashed border-gray-300 p-4 text-center text-gray-500">
            Nenhum item adicionado ainda.
          </p>
        ) : (
          <ul className="space-y-3">
            {itens.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between rounded-lg border border-gray-200 p-3"
              >
                <button
                  type="button"
                  onClick={() => marcarComoComprado(item.id)}
                  className={`text-left ${
                    item.comprado
                      ? "text-gray-400 line-through"
                      : "text-gray-900"
                  }`}
                >
                  {item.comprado ? "✅" : "⬜"} {item.nome}
                </button>

                <button
                  type="button"
                  onClick={() => removerItem(item.id)}
                  className="rounded-lg bg-red-500 px-3 py-1 text-sm font-semibold text-white hover:bg-red-600"
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}