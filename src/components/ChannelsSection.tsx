import { ArrowRight, Tv } from 'lucide-react';
import { Link } from 'react-router-dom';
import ChannelLogo from './tv/ChannelLogo';

const ChannelsSection = () => {
  const channelCategories = [
    {
      name: "Dětské a mládež",
      description: "Zábavné a vzdělávací kanály pro děti a mládež",
      channels: ["ČT :D (Déčko)", "Disney Channel", "Nickelodeon", "Cartoon Network", "Minimax", "JimJam"]
    },
    {
      name: "Zpravodajství",
      description: "Aktuální zprávy z domova i ze světa",
      channels: ["ČT24", "CNN Prima News", "BBC World News", "TA3", "Euronews"]
    },
    {
      name: "Dokumenty a kultura",
      description: "Poznávací a vzdělávací programy",
      channels: ["National Geographic", "Discovery Channel", "ČT art", "Spektrum", "Viasat History"]
    },
    {
      name: "Sport",
      description: "Sportovní přenosy a zpravodajství",
      channels: ["Eurosport 1", "Eurosport 2", "Nova Sport 1", "ČT sport"]
    }
  ];

  return (
    <section className="section-padding bg-background" aria-labelledby="channels-heading">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block bg-primary/10 text-primary py-1 px-4 rounded-full text-sm font-medium mb-4 border border-primary/20">
            TV programy
          </span>
          <h2 id="channels-heading" className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Bohatá <span className="text-gradient-gold">programová</span> nabídka
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Nabízíme více než 85 televizních kanálů v základní nabídce a další prémiové
            balíčky pro náročnější diváky.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {channelCategories.map((category, index) => (
            <article 
              key={index} 
              className="card-luxury group"
            >
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                <Tv className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {category.name}
              </h3>
              <p className="text-muted-foreground mb-4 text-sm">{category.description}</p>
              <div className="space-y-3 mb-4" aria-label={`Kanály v kategorii ${category.name}`}>
                {category.channels.map((channel, i) => (
                  <div key={i} className="flex items-center">
                    <ChannelLogo channelName={channel} className="w-8 h-5 mr-3 flex-shrink-0" />
                    <span className="text-muted-foreground text-sm">{channel}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="flex justify-center">
          <Link 
            to="/programy" 
            className="btn-noir inline-flex items-center"
            aria-label="Zobrazit všechny programy"
          >
            Zobrazit všechny programy 
            <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ChannelsSection;
