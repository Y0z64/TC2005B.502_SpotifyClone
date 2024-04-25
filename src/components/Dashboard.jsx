import { useState } from "react";
import { fetchSpotifyApi } from "../api/spotifyAPI.js";

const Dashboard = () => {
  const [result, setResult] = useState([]);
  const [form, setForm] = useState({
    search: "",
    track: "",
    album: "",
    artist: "",
  });
  const [typeSelected, setTypeSelected] = useState("");
  const handleChange = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    const newValues = {
      ...form,
      [e.target.name]: e.target.value,
    };
    console.log(newValues);
    setForm(newValues);
  };
  const handlePlayMusic = async (song) => {
    const token = `Bearer ${localStorage.getItem("token")}`;
    const data = {
      uris: [song],
    };

    const id_device = "5d9c2b72a76aa8bb4fa9f8634926596b47b2c8d3";

    const playSong = await fetchSpotifyApi(
      `https://api.spotify.com/v1/me/player/play?device_id=${id_device}`,
      "PUT",
      JSON.stringify(data),
      "application/json",
      token
    );
    console.log(playSong);
  };
  const getToken = async () => {
    // stored in the previous step
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get("code");
    let codeVerifier = localStorage.getItem("code_verifier");
    const url = "https://accounts.spotify.com/api/token";
    const clientId = "c6cd8097394f45908e0fc58c159f0cbe";
    const redirectUri = "http://localhost:5173/";
    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      }),
    };
    const body = await fetch(url, payload);
    const response = await body.json();
    console.log(response);
    localStorage.setItem("token", response.access_token);
  };
  const getDeviceId = async () => {
    const token = `Bearer ${localStorage.getItem("token")}`;
    const response = await fetchSpotifyApi(
      "https://api.spotify.com/v1/me/player/devices",
      "GET",
      null,
      "application/json",
      token
    );
    console.log(response);
    return response.devices.id;
  };
  const types = [
    "track",
    "artist",
    "album",
    "playlist",
    "show",
    "episode",
    "audiobook",
  ];

  const handleSelectChanges = (e) => {
    console.log(e.target.value);
    setTypeSelected(e.target.value);
  };
  const handleSearch = async () => {
    const params = new URLSearchParams();

    params.append(
      "q",
      encodeURIComponent(`remaster track:${form.search} artist:${form.artist}`)
    );
    params.append("type", typeSelected);
    const queryString = params.toString();
    const url = "https://api.spotify.com/v1/search";
    const updateUrl = `${url}?${queryString}`;
    const token = `Bearer ${localStorage.getItem("token")}`;
    console.log(token);
    const response = await fetchSpotifyApi(
      updateUrl,
      "GET",
      null,
      "application/json",
      token
    );
    console.log(updateUrl);
    console.log(response);
    setResult(response.tracks.items);
    console.log(response.tracks.items);
  };

  return (
    <>
      <div class="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"></div>
      <div className={"flex h-screen justify-center align-items-center over"}>
        <div className="overflow-y-scroll mt-10 w-full overflow-x-hidden">
          <div className={"pt-5 flex justify-center "}>
            <h1 className={"text-[5rem] font-bold tracking-tighter text-white"}>
              Spoti-lite
            </h1>
          </div>
          <div className={"flex p-4 justify-center scale-125"}>
            <div className={"pr-4"}>
              <button
                className={"bg-gray-300 w-[100px] rounded-full"}
                onClick={getToken}
              >
                Get Token
              </button>
            </div>
            <div className={"pr-4"}>
              <button
                className={"bg-gray-300 w-[100px] rounded-full"}
                onClick={getDeviceId}
              >
                Get Device
              </button>
            </div>
            <input
              className="w-50 h-7 border-2 border-gray-700 rounded-lg bg-spotify-grey text-white"
              placeholder=" Search"
              type={"text"}
              name={"search"}
              onChange={handleChange}
              value={form.search}
            />
            <div className={"pr-2 pl-2 "}></div>
            <input
              className="w-50 h-7 border-2 border-gray-700 rounded-lg bg-spotify-grey text-white"
              placeholder=" Artist"
              type="text"
              name="artist"
              value={form.artist}
              onChange={handleChange}
            ></input>
            <div className={"pr-2 pl-2 "}>
              <select
                className="rounded-full bg-gray-500/85 text-center"
                name={"types"}
                onChange={handleSelectChanges}
              >
                {types.map((item) => {
                  const capitalizedItem =
                    item.charAt(0).toUpperCase() + item.slice(1);
                  return (
                    <option key={item} value={item}>
                      {capitalizedItem}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className={"pr-4"}>
              <button
                className={
                  "rounded-full bg-spotify-green w-20  hover:bg-spotify-green/50"
                }
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
          <div className={"flex flex-col justify-center items-center pl-5"}>
            {result.length > 0 && (
              <div className="w-[1200px]">
                {result.map((item, idx) => (
                  <div
                    className={
                      "bg-gray-500/50 text-white mt-3 mb-3 mr-5 rounded-lg"
                    }
                  >
                    <div
                      key={item.id}
                      className={
                        "text-white flex justify-right items-center overflow-auto p-5"
                      }
                    >
                      <img
                        src={item.album.images[0].url}
                        alt={"hola"}
                        className="w-20 mr-2 round"
                      />
                      {item.name}
                      <div className={"pl-3"}>
                        <button
                          className={
                            "rounded-full bg-spotify-green w-20 h-7 text-spotify-grey"
                          }
                          onClick={() => handlePlayMusic(item.uri)}
                        >
                          Play
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
