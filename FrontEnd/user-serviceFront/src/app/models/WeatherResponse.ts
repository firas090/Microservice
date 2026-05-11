export interface WeatherResponse {
    main: {
      temp: number;
      humidity: number;
    };
    weather: {
      description: string;
    }[];
  }
  