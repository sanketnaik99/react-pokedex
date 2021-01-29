import React from "react";

interface Props {
  title: string;
  description: string;
  imageURL: string;
  imageALT: string;
}

const PokemonHero: React.FC<Props> = ({
  title,
  description,
  imageURL,
  imageALT,
}) => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 py-20 md:flex-row flex-col-reverse items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left  items-center text-center">
          <h1 className="font-body sm:text-5xl text-5xl mb-4 text-gray-900 dark:text-white color-transition">
            {title}
          </h1>
          <p className="mb-8 font-sans leading-relaxed text-lg dark:text-gray-200 color-transition">
            {description}
          </p>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-16 md:mb-0">
          <img
            className="object-cover object-center rounded"
            alt={imageALT}
            src={imageURL}
          />
        </div>
      </div>
    </section>
  );
};

export default PokemonHero;
