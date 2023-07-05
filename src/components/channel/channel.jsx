import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Button, Container } from "@mui/material";
import { ApiService } from "../../service/api.service";
import { ChannelCard, Videos } from "../";

function Channel() {
  const { id } = useParams();
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const dataChannelDetail = await ApiService.fetching(
          `channels?part=snippet&id=${id}`
        );
        setChannelDetail(dataChannelDetail?.data?.items[0]);
        const dataVideo = await ApiService.fetching(
          `search?channelId=${id}&part=snippet%2Cid&order=date`
        );
        setVideos(dataVideo?.data?.items);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [id]);
  return (
    <Box minHeight={"95vh"} mt={"1vh"}>
      <Box>
        <Box
          width={"100%"}
          height={"300px"}
          zIndex={10}
          sx={{
            backgroundImage: `url(${channelDetail?.brandingSettings?.image?.bannerExternalUrl})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            objectFit: "cover",
          }}
        />
        <ChannelCard video={channelDetail} marginTop={"-100px"} />
      </Box>
      <Container maxWidth={"90%"}>
        <Videos videos={videos} />
      </Container>
    </Box>
  );
}

export default Channel;
