// import React, { useEffect, useState } from "react";
// import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";
// import {
//     TextField,
//     Button,
//     Box,
//     Typography,
//     IconButton,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";

// function JsonTreeEditor() {
//     const [data, setData] = useState({});
//     const [loading, setLoading] = useState(true);
//     const [newConstituency, setNewConstituency] = useState("");

//     // ===============================
//     // Fetch Data
//     // ===============================
//     useEffect(() => {
//         fetch("http://localhost:5000/api/election/election-data")
//             .then((res) => res.json())
//             .then((result) => {
//                 setData(result);
//                 setLoading(false);
//             })
//             .catch((err) => {
//                 console.error("Error fetching data:", err);
//                 setLoading(false);
//             });
//     }, []);

//     // ===============================
//     // Deep Update Function
//     // ===============================
//     const handleChange = (path, value) => {
//         const keys = path.split(".");
//         const updated = JSON.parse(JSON.stringify(data));
//         let current = updated;

//         for (let i = 0; i < keys.length - 1; i++) {
//             current = current[keys[i]];
//         }

//         current[keys[keys.length - 1]] = value;

//         setData(updated);
//     };


//     // ===============================
//     // Delete Node
//     // ===============================
//     const handleDelete = (path) => {
//         const keys = path.split(".");
//         const updated = JSON.parse(JSON.stringify(data));
//         let current = updated;

//         for (let i = 0; i < keys.length - 1; i++) {
//             current = current[keys[i]];
//         }

//         delete current[keys[keys.length - 1]];
//         setData(updated);
//     };

//     // ===============================
//     // Add Constituency
//     // ===============================
//     const addConstituency = () => {
//         if (!newConstituency) return;

//         setData({
//             ...data,
//             [newConstituency]: {
//                 "Constituency Name": newConstituency,
//             },
//         });

//         setNewConstituency("");
//     };

//     // ===============================
//     // Add Party
//     // ===============================
//     const addParty = (constituencyKey) => {
//         const partyName = prompt("Enter Party Name:");
//         if (!partyName) return;

//         const updated = JSON.parse(JSON.stringify(data));
//         updated[constituencyKey][partyName] = {
//             "Candidate name": "",
//             Image: "",
//             Votes: 0,
//         };

//         setData(updated);
//     };

//     // ===============================
//     // Recursive Tree Renderer
//     // ===============================
//     const renderTree = (obj, parentPath = "") => {
//         return Object.entries(obj).map(([key, value]) => {
//             const currentPath = parentPath ? `${parentPath}.${key}` : key;

//             if (typeof value === "object" && value !== null) {
//                 const isConstituencyLevel = parentPath === "";

//                 return (
//                     <TreeItem
//                         key={currentPath}
//                         itemId={currentPath}
//                         label={
//                             <Box
//                                 sx={{
//                                     display: "flex",
//                                     alignItems: "center",
//                                     justifyContent: "space-between",
//                                     width: "100%",
//                                 }}
//                             >
//                                 <Typography fontWeight="bold">{key}</Typography>

//                                 <Box>
//                                     {isConstituencyLevel && (
//                                         <Button
//                                             size="small"
//                                             onClick={() => addParty(key)}
//                                             sx={{ mr: 1 }}
//                                         >
//                                             + Party
//                                         </Button>
//                                     )}

//                                     <IconButton
//                                         size="small"
//                                         onClick={() => handleDelete(currentPath)}
//                                     >
//                                         <DeleteIcon fontSize="small" />
//                                     </IconButton>
//                                 </Box>
//                             </Box>
//                         }
//                     >
//                         {renderTree(value, currentPath)}
//                     </TreeItem>
//                 );
//             }

//             return (
//                 <TreeItem
//                     key={currentPath}
//                     itemId={currentPath}
//                     label={
//                         <Box
//                             sx={{
//                                 display: "flex",
//                                 gap: 2,
//                                 alignItems: "center",
//                             }}
//                         >
//                             <Typography>{key}:</Typography>
//                             <TextField
//                                 size="small"
//                                 type={key === "Votes" ? "number" : "text"}
//                                 value={t(value) ?? ""}
//                                 onClick={(e) => e.stopPropagation()}
//                                 onFocus={(e) => e.stopPropagation()}
//                                 onKeyDown={(e) => e.stopPropagation()}
//                                 onChange={(e) =>
//                                     handleChange(currentPath, e.target.value)
//                                 }
//                             />
//                         </Box>
//                     }
//                 />
//             );
//         });
//     };

//     // ===============================
//     // Save to Backend
//     // ===============================
//     const convertNumbers = (obj) => {
//         if (typeof obj !== "object" || obj === null) return obj;

//         const newObj = Array.isArray(obj) ? [] : {};

//         for (let key in obj) {
//             if (key === "Votes") {
//                 newObj[key] = Number(obj[key] || 0);
//             } else {
//                 newObj[key] = convertNumbers(obj[key]);
//             }
//         }

//         return newObj;
//     };

//     const handleSave = () => {
//         const cleanedData = convertNumbers(data);

//         fetch("http://localhost:5000/api/election/update-election-data", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(cleanedData),
//         })
//             .then((res) => res.json())
//             .then(() => alert("Election data updated successfully"))
//             .catch((err) => console.error("Save failed:", err));
//     };

//     if (loading) return <p>Loading election data...</p>;

//     return (
//         <Box sx={{ padding: 4 }}>
//             {/* Add Constituency */}
//             <Box sx={{ mb: 3, display: "flex", gap: 2 }}>
//                 <TextField
//                     label="New Constituency Key"
//                     size="small"
//                     value={newConstituency}
//                     onChange={(e) => setNewConstituency(e.target.value)}
//                 />

//                 <Button variant="contained" onClick={addConstituency}>
//                     Add Constituency
//                 </Button>
//             </Box>

//             <SimpleTreeView>
//                 {renderTree(data)}
//             </SimpleTreeView>

//             <Button
//                 variant="contained"
//                 sx={{ marginTop: 3 }}
//                 onClick={handleSave}
//             >
//                 Save Changes
//             </Button>
//         </Box>
//     );
// }

// export default JsonTreeEditor;







import React, { useEffect, useState } from "react";
import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";
import MenuItem from "@mui/material/MenuItem";
import { useTranslation } from "react-i18next";
import {
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  Paper,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function JsonTreeEditor() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [newParty, setNewParty] = useState("");
  const [newDistrict, setNewDistrict] = useState("");
  const [hasChanges, setHasChanges] = useState(false);
  const [newSeat, setNewSeat] = useState("");
  const { t, i18n } = useTranslation();

  useEffect(() => {
    fetch(`http://localhost:5000/api/election/election-data`)
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });

  }, [i18n.language]);

  const clone = (obj) => JSON.parse(JSON.stringify(obj));
  // const clone = structuredClone;

  const handleChange = (path, value) => {
    const keys = path.split("__");
    const updated = clone(data);

    let current = updated;

    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }

    const lastKey = keys[keys.length - 1];

    if (Array.isArray(current)) {
      current[Number(lastKey)] = value;
    } else {
      current[lastKey] = value;
    }

    setData(updated);
    setHasChanges(true);
  };

  const handleDelete = (path) => {
    const keys = path.split("__");
    const updated = clone(data);

    let current = updated;

    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }

    const lastKey = keys[keys.length - 1];

    if (Array.isArray(current)) {
      current.splice(Number(lastKey), 1);
    } else {
      delete current[lastKey];
    }

    setData(updated);
    setHasChanges(true);
  };

  const addDistrict = () => {
    if (!newDistrict.trim()) return;

    const key = newDistrict.toLowerCase().replace(/\s+/g, "_");

    const updated = clone(data);

    if (!updated["Districts"]) {
      updated["Districts"] = {};
    }

    updated["Districts"][key] = {
      "District Name_eg": newDistrict,
      "District Name_bn": "",
      "District Name_hn": "",
      "constituencys": {}
    };

    setData(updated);
    setNewDistrict("");
    setHasChanges(true);
  };

  const addConstituencyToDistrict = (districtKey) => {

    const name = prompt("Enter Constituency Name:");
    if (!name) return;

    const key = name.toLowerCase().replace(/\s+/g, "_");

    const updated = clone(data);

    updated["Districts"][districtKey]["constituencys"][key] = {
      "Constituency Name_eg": name,
      "Constituency Name_bn": "",
      "Constituency Name_hn": "",
      "Total_NO_of_Voters": "",
      "Parties": {}
    };

    setData(updated);
    setHasChanges(true);
  };

  const addParty = (path) => {

    if (!newParty.trim()) return;

    const updated = clone(data);

    const keys = path.split("__");
    let obj = updated;

    keys.forEach((k) => {
      obj = obj[k];
    });

    obj[newParty] = Number(newSeat || 0);

    setData(updated);
    setNewParty("");
    setNewSeat("");
    setHasChanges(true);
  };

  // const addDistrictSeatParty = (districtKey) => {
  //   const partyName = prompt("Enter Party Name:");
  //   if (!partyName) return;

  //   const updated = clone(data);

  //   updated["Districts"][districtKey]["seats_divide"][partyName] = 0;

  //   setData(updated);
  //   setHasChanges(true);
  // };

  const reverseTranslate = (value) => {
    const resources = i18n.getResourceBundle(i18n.language, "translation");

    const match = Object.keys(resources).find(
      key => resources[key] === value
    );

    return match || value;
  };

  const addPartyToConstituency = (districtKey, constituencyKey) => {
    const partyName = prompt("Enter Party Name:");
    if (!partyName) return;

    const updated = clone(data);

    updated["Districts"][districtKey]["constituencys"][constituencyKey]["Parties"][partyName] = {
      "Candidate name_eg": "",
      "Candidate name_bn": "",
      "Candidate name_hn": "",
      "Image": "",
      "Votes": 0
    };

    setData(updated);
    setHasChanges(true);
  };

  const convertNumbers = (obj) => {
    if (typeof obj !== "object" || obj === null) return obj;

    const newObj = Array.isArray(obj) ? [] : {};

    for (let key in obj) {
      if (key === "Votes") {
        newObj[key] = Number(obj[key] || 0);
      } else {
        newObj[key] = convertNumbers(obj[key]);
      }
    }

    return newObj;
  };

  const saveToBackend = (updatedData) => {

    const cleaned = convertNumbers(updatedData);

    fetch("http://localhost:5000/api/election/update-json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cleaned)
    })
      .then(() => {
        setData(cleaned);
        setHasChanges(false);
      })
      .catch((err) => console.error("Save failed:", err));

  };

  const handleSave = () => {
    saveToBackend(data);
    alert("Election data updated successfully");
  };

  const handleImageUpload = async (e, path) => {

    const file = e.target.files[0];
    if (!file) return;

    const keys = path.split("__");

    const districtIndex = keys.indexOf("Districts") + 1;
    const constituencyIndex = keys.indexOf("constituencys") + 1;
    const partyIndex = keys.indexOf("Parties") + 1;

    const district = keys[districtIndex];
    const constituency = keys[constituencyIndex];
    const party = keys[partyIndex];

    if (!district || !constituency || !party) {
      console.error("Invalid path:", path);
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    // formData.append("district", district);
    formData.append("constituency", constituency);
    formData.append("party", party);

    try {

      const res = await fetch(
        "http://localhost:5000/api/election/uploadimage",
        {
          method: "POST",
          body: formData
        }
      );

      const result = await res.json();

      const updated = clone(data);

      if (
        updated?.Districts?.[district]?.constituencys?.[constituency]?.Parties?.[party]
      ) {
        updated.Districts[district]
          .constituencys[constituency]
          .Parties[party]
          .Image = result.image;
      }

      setData(updated);

      setData(updated);

    } catch (error) {

      console.error("Upload failed", error);

    }

  };

  const renderTree = (obj, parentPath = "") => {
    if (Array.isArray(obj)) {
      return obj.map((item, index) => {
        const currentPath = parentPath
          ? `${parentPath}__${index}`
          : `${index}`;

        return (
          <TreeItem
            key={currentPath}
            itemId={currentPath}
            label={
              <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                <TextField
                  size="small"
                  fullWidth
                  value={item}
                  onChange={(e) =>
                    handleChange(currentPath, reverseTranslate(e.target.value))
                  }
                  onKeyDown={(e) => e.stopPropagation()}
                  onClick={(e) => e.stopPropagation()}
                  onFocus={(e) => e.stopPropagation()}
                />

                <IconButton
                  color="error"
                  onClick={() => handleDelete(currentPath)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            }
          />
        );
      });
    }

    return Object.entries(obj).map(([key, value]) => {
      const currentPath = parentPath
        ? `${parentPath}__${key}`
        : key;

      const isDistrict =
        parentPath === "Districts";

      // const isDistrictSeatDivide =
      //   parentPath.startsWith("Districts__") &&
      //   key === "seats_divide";

      const isPartyContainer = key === "Parties";

      const isIndividualParty =
        parentPath.includes("Parties") &&
        typeof value === "object";

      if (typeof value === "object" && value !== null) {
        return (
          <TreeItem
            key={currentPath}
            itemId={currentPath}
            label={
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Typography fontWeight="bold">{t(key)}</Typography>

                <Box>
                  {/* Add New Constituency */}
                  {isDistrict && (
                    <>
                      <Button
                        size="small"
                        sx={{ mr: 1 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          addConstituencyToDistrict(key);
                        }}
                      >
                        + Constituency
                      </Button>

                      <IconButton
                        color="error"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(currentPath);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}

                  {/* {isDistrictSeatDivide && (
                    <Box sx={{ display: "flex", gap: 1, mt: 1 }}>

                      <TextField
                        size="small"
                        label="Party"
                        value={newParty}
                        onChange={(e) => setNewParty(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => e.stopPropagation()}
                      />

                      <TextField
                        size="small"
                        label="Seats"
                        type="number"
                        value={newSeat}
                        onChange={(e) => setNewSeat(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => e.stopPropagation()}
                      />

                      <Button
                        size="small"
                        variant="contained"
                        onClick={(e) => {
                          e.stopPropagation();
                          addParty(currentPath);
                        }}
                      >
                        Add
                      </Button>

                    </Box>
                  )} */}

                  <Box>

                    {/* +Party inside Parties container */}
                    {isPartyContainer && (
                      <Button
                        size="small"
                        sx={{ mr: 1 }}
                        onClick={(e) => {
                          e.stopPropagation();

                          const parts = parentPath.split("__");
                          const districtKey = parts[1];
                          const constituencyKey = parts[3];

                          addPartyToConstituency(districtKey, constituencyKey);
                        }}
                      >
                        + Party
                      </Button>
                    )}

                    {/* Delete individual party */}
                    {isIndividualParty && (
                      <IconButton
                        color="error"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(currentPath);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}

                  </Box>
                </Box>
              </Box>
            }
          >
            {renderTree(value, currentPath)}
          </TreeItem>
        );
      }

      return (
        <TreeItem
          key={currentPath}
          itemId={currentPath}
          label={
            <Box
              sx={{
                display: "flex",
                gap: 2,
                mt: 1.5,
                mb: 1.5,
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography sx={{ minWidth: "150px" }}>
                {t(key)}:
              </Typography>

              {key === "Image" ? (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    flexDirection: { xs: "column", sm: "row" } // mobile column, desktop row
                  }}
                >

                  {value && (
                    <img
                      src={`http://localhost:5000/uploads/candidates/${value}`}
                      alt="candidate"
                      width="60"
                      height="60"
                      style={{
                        borderRadius: "50%",
                        objectFit: "cover"
                      }}
                    />
                  )}

                  <Button
                    variant="outlined"
                    component="label"
                    size="small"
                    sx={{ width: { xs: "100%", sm: "auto" } }}
                  >
                    Upload
                    <input
                      hidden
                      type="file"
                      onClick={(e) => e.stopPropagation()}
                      onKeyDown={(e) => e.stopPropagation()}
                      onChange={(e) => handleImageUpload(e, currentPath)}
                    />
                  </Button>
                  
                </Box>

              ) : (
                <TextField
                  fullWidth
                  size="small"
                  type={key === "Votes" ? "number" : "text"}
                  value={value}
                  onChange={(e) => handleChange(currentPath, e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => e.stopPropagation()}
                  onFocus={(e) => e.stopPropagation()}
                />
              )}

              {parentPath.includes("seats_divide") && (
                <IconButton
                  color="error"
                  onClick={() => handleDelete(currentPath)}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </Box>
          }
        />
      );
    });
  };

  if (loading) return <p>Loading election data...</p>;

  return (
    <Paper
      elevation={3}
      sx={{
        p: { xs: 2, md: 4 },
        borderRadius: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          {t("Election Data Editor")}
        </Typography>

        <TextField
          select
          size="small"
          value={i18n.language}
          onChange={(e) => i18n.changeLanguage(e.target.value)}
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="hi">Hindi</MenuItem>
          <MenuItem value="bn">Bengali</MenuItem>
        </TextField>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 3,
          mb: 4,
        }}
      >
        <Paper
          elevation={2}
          sx={{
            p: 3,
            borderRadius: 3,
            background: "#f8fafc",
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
            {t("Add Party")}
          </Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              fullWidth
              size="small"
              placeholder={t("Enter party name")}
              value={newParty}
              onChange={(e) => setNewParty(e.target.value)}
            />

            <Button
              variant="contained"
              onClick={() => {
                if (!newParty.trim()) return;

                const updated = clone(data);

                if (!updated["Party_list"]) {
                  updated["Party_list"] = {
                    en: [],
                    bn: [],
                    hn: []
                  };
                }

                if (!updated["Party_list"].en) updated["Party_list"].en = [];
                if (!updated["Party_list"].bn) updated["Party_list"].bn = [];
                if (!updated["Party_list"].hn) updated["Party_list"].hn = [];

                updated["Party_list"].en.push(newParty);
                updated["Party_list"].bn.push(newParty);
                updated["Party_list"].hn.push(newParty);

                setData(updated);
                setNewParty("");
                setHasChanges(true);
              }}
            >
              Add
            </Button>
          </Box>
        </Paper>

        <Paper
          elevation={2}
          sx={{
            p: 3,
            borderRadius: 3,
            background: "#f8fafc",
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
            {t("Add District")}
          </Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              fullWidth
              size="small"
              placeholder={t("Enter district name")}
              value={newDistrict}
              onChange={(e) => setNewDistrict(e.target.value)}
            />

            <Button
              variant="contained"
              onClick={addDistrict}
            >
              Add
            </Button>
          </Box>
        </Paper>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <SimpleTreeView expansionTrigger="iconContainer">
        {renderTree(data)}
      </SimpleTreeView>

      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          size="large"
          disabled={!hasChanges}
          onClick={handleSave}
        >
          Save Changes
        </Button>
      </Box>
    </Paper>
  );
}

export default JsonTreeEditor;