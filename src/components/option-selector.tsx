import React, { useState } from "react";
import { SAMPLE_DATA, type IGroup } from "../sample-data";

const ROOT_GROUP = {
  group_id: "root",
  group_label: "All Options",
};

const getGroupPath = (group: IGroup | null) => {
  return group?.path.map((el) => el.group_id).join(".");
};

const getAllGroups = (sampleData: Record<string, IGroup>) => {
  return Object.keys(sampleData).map((node) => sampleData[node]);
};

const getBreadCrumbArray = (group: IGroup | null) => {
  return group?.path?.slice(-2) || [];
};

export default function OptionSelector() {
  //states
  const [sampleData, setSampleData] = useState(SAMPLE_DATA);
  const [selectedGroup, setSelectedGroup] = useState<{
    group_id: string;
    group_label: string;
  } | null>(ROOT_GROUP);
  const [showModal, setShowModal] = useState(false);

  const displayedGroup = selectedGroup
    ? sampleData[selectedGroup.group_id]
    : null;

  const [input, setInput] = useState(getGroupPath(displayedGroup));

  console.log(getGroupPath(displayedGroup));

  const handleInputChange = (newInput: string) => {
    // updating input

    setInput(newInput);

    //updating selected group
    const allGroups = getAllGroups(sampleData);

    const groupWithInputPath = allGroups.find(
      (group) => getGroupPath(group) === newInput
    );
    console.log("groupWithInputPath", groupWithInputPath);
    if (groupWithInputPath) {
      setSelectedGroup({
        group_id: groupWithInputPath.group_id,
        group_label: groupWithInputPath.group_title,
      });
      return;
    }
    setSelectedGroup(null);
  };

  const onGroupClick = (id: string) => {
    const group = sampleData[id];
    setSelectedGroup({
      group_id: group.group_id,
      group_label: group.group_title,
    });
    const groupIds = group.path.map((el) => el.group_id);
    const updatedInputList = [...groupIds, group.group_id];

    setInput(updatedInputList.join("."));
  };

  const breadCrumbsArray = displayedGroup
    ? [
        ...getBreadCrumbArray(displayedGroup),
        {
          group_id: displayedGroup.group_id,
          group_label: displayedGroup.group_title,
        },
      ]
    : [];

  const handleSubmitCreateNewSection = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const section = formData.get("section") as string;
    const sectionId = formData.get("section-id") as string;

    if (!selectedGroup || !section || !sectionId) return;

    setSampleData({
      ...sampleData,
      [selectedGroup.group_id]: {
        ...sampleData[selectedGroup.group_id],
        sections: [
          ...sampleData[selectedGroup.group_id].sections,
          {
            section_id: sectionId,
            section_label: section,
            options: [],
          },
        ],
      },
    });
    setShowModal(false);
  };

  const handleSubmitCreateNewOption = (
    e: React.FormEvent<HTMLFormElement>,
    sectionId: string
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const option = formData.get("option") as string;
    const optionId = formData.get("option-id") as string;
    const hasChildren = formData.get("has-children");

    if (!selectedGroup || !option || !optionId) return;

    let updatedSection = sampleData[selectedGroup.group_id].sections.find(
      (section) => section.section_id === sectionId
    );

    if (!updatedSection) return;

    updatedSection = {
      ...updatedSection,
      options: [
        ...updatedSection.options,
        {
          option_id: optionId,
          option_label: option,
          has_group: !!hasChildren,
        },
      ],
    };

    setSampleData({
      ...sampleData,
      [selectedGroup.group_id]: {
        ...sampleData[selectedGroup.group_id],
        sections: [
          ...sampleData[selectedGroup.group_id].sections.filter(
            (section) => section.section_id !== sectionId
          ),
          updatedSection,
        ],
      },
    });
    setShowModal(false);
  };

  return (
    <>
      <div className=" w-2xl">
        <input
          value={input}
          onChange={(e) => handleInputChange(e.target.value)}
          className="border w-full rounded-lg focus:border-cyan-800"
        />

        <div className="group flex border-stone-500 bg-stone-300 gap-2">
          {breadCrumbsArray.length === 1 ? (
            <div className="flex">
              <div className="cursor-pointer">
                {breadCrumbsArray[0].group_label}
              </div>
            </div>
          ) : (
            breadCrumbsArray.map((breadCrumb) => (
              <div key={breadCrumb.group_id} className="flex">
                <div
                  className="text-cyan-700 cursor-pointer"
                  onClick={() => {
                    onGroupClick(breadCrumb.group_id);
                  }}
                >
                  {breadCrumb.group_label}
                </div>
                <div>{">"}</div>
              </div>
            ))
          )}
        </div>
        {!!displayedGroup && (
          <div>
            {displayedGroup.sections.map((section) => (
              <div key={section.section_id}>
                <p className=" font-bold">{section.section_label}</p>
                {section.options.map((option) => (
                  <div
                    key={option.option_id}
                    onClick={
                      option.has_group
                        ? () => onGroupClick(option.option_id)
                        : undefined
                    }
                    className="w-full flex cursor-pointer hover:border rounded justify-between items-center"
                  >
                    {option.option_label}
                    <div>{option.has_group && ">"}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
        <div
          className="cursor-pointer border hover:bg-red-400"
          onClick={() => setShowModal(true)}
        >
          Add Entry
        </div>

        {showModal && (
          <div className="rounded p-5 border bg-white absolute h-4/5 w-4/5 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-auto">
            <div
              className="absolute top-0 right-0 p-5 cursor-pointer"
              onClick={() => setShowModal(false)}
            >
              X
            </div>
            <h2 className="text-center p-4">
              Add an entry to the Group "{displayedGroup?.group_title}"
            </h2>
            <div>
              {displayedGroup?.sections.map((section) => (
                <div className="p-5 ">
                  <div key={section.section_id}>
                    <p className="font-bold">{section.section_label}</p>
                  </div>
                  <form
                    className="border gap-3 flex flex-col rounded p-5"
                    onSubmit={(e) =>
                      handleSubmitCreateNewOption(e, section.section_id)
                    }
                  >
                    <input
                      required
                      placeholder="Enter option-id"
                      name="option-id"
                    />
                    <input
                      required
                      placeholder="Enter option name"
                      name="option"
                    />
                    <div>
                      <label htmlFor="has-children">Has children</label>
                      <input
                        placeholder="has children"
                        name="has-children"
                        type="checkbox"
                      />
                    </div>
                    <button className="bg-orange-400" type="submit">
                      Add Option
                    </button>
                  </form>
                </div>
              ))}
              <form
                className="border gap-3 flex flex-col rounded p-5"
                onSubmit={handleSubmitCreateNewSection}
              >
                <input
                  required
                  placeholder="Enter section-id"
                  name="section-id"
                />
                <input required placeholder="Enter section" name="section" />
                <button className="bg-orange-400" type="submit">
                  Add Section
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
