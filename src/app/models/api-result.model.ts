export interface Name {
  title: string,
  first: string,
  last: string
}

export interface Picture {
  medium: string
  large: string
  thumbnail: string
}

export interface Registered {
  date: string;
  age: number;
}

export interface Street {
  number: number;
  name: string;
}

export interface Timezone {
  offset: string;
  description: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Location {
  city: string;
  coordinates: Coordinates;
  country: string;
  postcode: number;
  state: string;
  street: Street;
  timezone: Timezone;
  registered: Registered;
}

export interface DateOfBirth {
  age: number;
  date: string;
}

export interface UserResult {
  name: Name;
  email: string;
  phone: string;
  picture: Picture;
  nat: string;
  login: {
    uuid: string
    username: string
    password: string
    salt: string
    md5: string
    sha1: string
    sha256: string
  };
  gender: string;
  dob: DateOfBirth;
  location: Location;
}

export interface Info {
  seed: string
  results: number
  page: number
}

export interface ApiResult {
  results: UserResult[],
  info: Info
}
