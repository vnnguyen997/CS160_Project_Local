import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import { FaLocationArrow, FaTimes } from "react-icons/fa";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useRef, useState, useEffect } from "react";

const center = { lat: 37.33537504308407, lng: -121.88044923064777 };
const warehouse1 = "777 Story Rd, San Jose, CA 95122";
const warehouse2 = "2201 Senter Rd, San Jose, CA 95112";
let warehouse_address;

function Map({ userData, warehouse }) {
  console.log(warehouse);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const user_address =
    userData.address +
    ", " +
    userData.city +
    ", " +
    userData.state +
    ", " +
    userData.zip;
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef();

  /*
    if (!isLoaded) {
      return <SkeletonText />;
    }
  */

  if (warehouse === "1") {
    warehouse_address = warehouse1;
  } else {
    warehouse_address = warehouse2;
  }

  async function calculateRoute() {
    if (originRef.current.value === "" || destinationRef.current.value === "") {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  useEffect(() => {
    calculateRoute();
  }, [originRef.current, destinationRef.current]);

  /*
    function clearRoute() {
      setDirectionsResponse(null);
      setDistance("");
      setDuration("");
      originRef.current.value = "";
      destinationRef.current.value = "";
    }
  */

  return (
    <Flex
      position="relative"
      flexDirection="column"
      alignItems="center"
      h="70vh" //height for map, adjust later for page
      w="100vw" //width for map, adjust later for page
    >
      <Box position="absolute" left={0} top={0} h="100%" w="100%">
        {/* Google Map Box */}
        {window.google ? (
          <GoogleMap
            center={center}
            zoom={15}
            mapContainerStyle={{ width: "100%", height: "100%" }}
            options={{
              zoomControl: true,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
            onLoad={(map) => setMap(map)}
          >
            <Marker position={center} />
            {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
            )}
          </GoogleMap>
        ) : null}
      </Box>
      <Box
        p={4}
        borderRadius="lg"
        m={4}
        bgColor="white"
        shadow="base"
        minW="container.md"
        zIndex="1"
        w="100%" //weight for middle box
        maxW="50%" //height for middle box
      >
        <HStack spacing={2} justifyContent="space-between">
          <Box flexGrow={1}>
            {window.google ? (
              <Autocomplete>
                <Input
                  type="text"
                  placeholder="Origin"
                  ref={originRef}
                  defaultValue={warehouse_address}
                  disabled={true}
                />
              </Autocomplete>
            ) : null}
          </Box>
          <Box flexGrow={1}>
            {window.google ? (
              <Autocomplete>
                <Input
                  type="text"
                  placeholder="Destination"
                  ref={destinationRef}
                  defaultValue={user_address}
                  disabled={true}
                />
              </Autocomplete>
            ) : null}
          </Box>
        </HStack>
        <HStack spacing={4} mt={4} justifyContent="space-between">
          <Text>Distance: {distance} </Text>
          <Text>Duration: {duration} </Text>
          <IconButton
            aria-label="center back"
            icon={<FaLocationArrow />}
            isRound
            onClick={() => {
              map.panTo(center);
              map.setZoom(15);
            }}
          />
        </HStack>
      </Box>
    </Flex>
  );
}

export default Map;
