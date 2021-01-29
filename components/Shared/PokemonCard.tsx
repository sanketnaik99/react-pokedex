import React from "react";

const PokemonCard = () => {
  return (
    <div className="rounded-2xl shadow-lg flex overflow-hidden flex-col w-80 bg-gray-200 dark:bg-gray-600">
      <img
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
        alt="Bulbasaur"
        className="w-60 mx-10"
      />
      <div className="flex flex-row p-2 pb-4 justify-center">
        <div className="badge dark">Grass</div>
        <div className="badge fairy">Electric</div>
      </div>
      <div className="px-4 py-2 bg-white dark:bg-gray-700 dark:text-gray-100 color-transition">
        <div className="font-bold text-3xl mb-2 text-center">Bulbasaur</div>

        <div className="flex flex-row mt-2">
          <div className="flex flex-1 flex-col items-center border-r-2 border-gray-200 dark:border-gray-600">
            <span className="font-medium text-lg mb-0 pb-0">Weight</span>
            <span className="font-light text-lg mt-0 pt-0">30Kg</span>
          </div>
          <div className="flex flex-1 flex-col items-center  ">
            <span className="font-medium text-lg">Height</span>
            <span className="font-light text-lg">7m</span>
          </div>
        </div>
        <div className="mt-0.5 flex flex-col items-center">
          <span className="font-medium text-lg">HP</span>
          <span className="font-light text-lg">45</span>
        </div>
        <div className="mt-4 mb-3 py-2 px-4 mx-8 rounded-xl shadow-sm  cursor-pointer font-bold bg-gradient-to-br from-red-400 to-red-600 text-white flex flex-row justify-center hover:shadow-lg">
          <span>Learn More</span>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
