"use client";
import { fetchFandomCharacters } from "@/controllers/characters.controller";
import Button from "@atoms/Button";
import LoadingScreen from "@atoms/LoadingScreen";
import React, { useMemo, useState } from "react";
import { toast } from "sonner";

const AdminCharactersPage = () => {
  const [updateCount, setUpdateCount] = useState(0);
  const [updateTotal, setUpdateTotal] = useState(0);
  // const [subUpdateCount, setSubUpdateCount] = useState(0);
  // const [subUpdateTotal, setSubUpdateTotal] = useState(0);
  const [times, setTimes] = useState<number[]>([]);
  const [lastAdded, setLastAdded] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const averageTime = useMemo(() => (times.reduce((acc, curr) => acc + curr, 0) || 0) / times.length, [times]);
  const remainingTime = useMemo(() => (((updateTotal - updateCount) * averageTime) / 1000).toFixed(0), [updateTotal, updateCount, averageTime]);

  const handleStream = async (stream: ReadableStream<any>) => {
    try {
      const reader = stream.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = "";
      let done = false;

      while (!done) {
        const { value, done: streamDone } = await reader.read();

        done = streamDone;

        if (value) {
          const strValue = decoder.decode(value, { stream: true });
          buffer += strValue;
          const chunks = buffer.split("\n\n");
          const data = chunks[chunks.length - 2];
          let total = 0;
          console.log(data);

          if (data.includes(" - ")) {
            if (data.includes("TOTAL")) total = parseInt(data.split("- ")[1]);
          }

          if (updateTotal !== total && total !== 0) setUpdateTotal(total);

          if (data.includes(":")) {
            if (data.includes("CATEGORY")) {
              setUpdateCount((old) => old + 1);
            }

            setLastAdded(data);

            if (data.includes("/")) setTimes((old) => [...old, parseInt(data.split("/ ")[1])]);
          }
        }
      }

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleUpdate = async (fetch: () => Promise<ReadableStream<any>>) => {
    setIsLoading(true);
    const stream = await fetch();

    handleStream(stream)
      .then(() => {
        toast.success("Les données API ont été mises à jour !");
        resetState();
      })
      .catch((err) => {
        resetState();
        console.log("Error :", err);
        toast.error("Impossible de mettre à jour les données API.");
      });
  };

  const resetState = () => {
    setIsLoading(false);
    setUpdateTotal(0);
    setUpdateCount(0);
    // setSubUpdateCount(0);
    // setSubUpdateTotal(0);
    setTimes([]);
    setLastAdded("");
  };

  return (
    <div>
      {isLoading && (
        <>
          <LoadingScreen
            message={`${updateCount}/${updateTotal}\n${lastAdded}\nIl reste environ : ${remainingTime || 0} s`}
            progressBar={{ current: updateCount, total: updateTotal }}
          >
            {/* <ProgressBar total={subUpdateTotal} value={subUpdateCount} color={"#2b4"} />
            <p className="font-bold text-center whitespace-pre">{`${subUpdateCount}/${subUpdateTotal}`}</p> */}
          </LoadingScreen>
        </>
      )}

      <Button onClick={() => handleUpdate(() => fetchFandomCharacters())} color={"default"}>
        Fetch
      </Button>
    </div>
  );
};

export default AdminCharactersPage;
