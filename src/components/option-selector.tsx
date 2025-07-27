import React, { useState } from "react";
import { SAMPLE_DATA } from "../sample-data";
import { getGroupPath } from "../helpers/getGroupPath";
import { getAllGroups } from "../helpers/getAllGroups";
import { getBreadCrumbArray } from "../helpers/getBreadCrumbArray";
import { ROOT_GROUP } from "../constants";
import Input from "./input";
import Button from "./button";
import Option from "./option";

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

  const handleInputChange = (newInput: string) => {
    // updating input
    setInput(newInput);

    //updating selected group
    const allGroups = getAllGroups(sampleData);
    const groupWithInputPath = allGroups.find(
      (group) => getGroupPath(group) === newInput
    );

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
      <div className="relative w-2xl">
        <Input
          value={input}
          onChange={(e) => handleInputChange(e.target.value)}
        />
        <div className="border border-stone-400 shadow absolute w-2xl">
          <div className="group flex p-2 bg-stone-100 border border-stone-500 border-x-0 border-t-0 gap-2">
            {breadCrumbsArray.length === 1 ? (
              <div className="flex">
                <div className="cursor-pointer">
                  {breadCrumbsArray[0].group_label}
                </div>
              </div>
            ) : (
              breadCrumbsArray.slice(-2).map((breadCrumb) => (
                <div key={breadCrumb.group_id} className="flex">
                  <div
                    className="text-cyan-700 cursor-pointer"
                    onClick={() => {
                      onGroupClick(breadCrumb.group_id);
                    }}
                  >
                    {breadCrumb.group_label}
                  </div>
                  <div>{" > "}</div>
                </div>
              ))
            )}
          </div>
          <div className=" max-h-44 overflow-auto ">
            {!!displayedGroup && (
              <div>
                {displayedGroup.sections.map((section) => (
                  <div key={section.section_id}>
                    <p className=" font-bold p-2">{section.section_label}</p>
                    {section.options.map((option) => (
                      <Option
                        onClick={() => onGroupClick(option.option_id)}
                        {...option}
                      />
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
          <Button onClick={() => setShowModal(true)}>Add Entry</Button>
        </div>
      </div>
      {showModal && (
        <div className="rounded p-5 border bg-white absolute z-10 h-4/5 w-4/5 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-auto">
          <div
            className="absolute top-0 right-0 p-5 cursor-pointer"
            onClick={() => setShowModal(false)}
          >
            X
          </div>
          <h2 className="text-center text-lg font-bold p-4">
            Add an entry to the Group "{displayedGroup?.group_title}"
          </h2>
          <div>
            {displayedGroup?.sections.map((section) => (
              <div className="p-5 ">
                <div key={section.section_id}>
                  <p className="font-bold">
                    Add an option to section : {section.section_label}
                  </p>
                </div>
                <form
                  className="gap-3 flex flex-col"
                  onSubmit={(e) =>
                    handleSubmitCreateNewOption(e, section.section_id)
                  }
                >
                  <Input
                    required
                    placeholder="Enter option-id"
                    name="option-id"
                  />
                  <Input
                    required
                    placeholder="Enter option name"
                    name="option"
                  />
                  <div className="flex gap-2 ">
                    <label htmlFor="has-children">Has children</label>
                    <Input
                      placeholder="has children"
                      name="has-children"
                      type="checkbox"
                    />
                  </div>
                  <Button type="submit">Add Option</Button>
                </form>
              </div>
            ))}
            <hr />

            <form
              className="gap-3 flex flex-col  p-5"
              onSubmit={handleSubmitCreateNewSection}
            >
              <p className="font-bold">Create a new section</p>
              <Input
                required
                placeholder="Enter section-id"
                name="section-id"
              />
              <Input required placeholder="Enter section" name="section" />
              <Button type="submit">Add Section</Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
