import { createSlice } from "@reduxjs/toolkit";
import {
  toggleSidebarCollapsed as toggleSidebarCollapsedThunk,
  setFilterType as setFilterTypeThunk,
  getLabelsList,
  addNewLabel,
  deleteLabel,
  updateLabel,
  getContactsList,
  addNewContact,
  removeContact,
  getMailsList,
  updateMailsFolder,
  updateMailsLabel,
  updateFvrtStatus,
  updateReadStatus,
  updateImprtntStatus,
  composeMail,
  getSelectedMail,
  updateSelectedMail,
  replyToMail,
  executeCode,
  searchEmails,
  nullifySelectedMail as nullifySelectedMailThunk,
} from "./actions";

const initialState = {
  isSideBarCollapsed: false,
  labelsList: [],
  contactsList: [],
  allMailList: [],
  mailsList: [],
  codeResult: null,
  filterType: {
    selectedFolder: "inbox",
    selectedFilter: "",
    selectedLabel: "",
    searchText: "",
    page: 0,
  },
  selectedMail: null,
  totalMailCount: null,
  loading: {
    searchEmails: false,
    codeResult: false,
    isSideBarCollapsed: false,
    setFilterType: false,
    getLabelsList: false,
    addNewLabel: false,
    deleteLabel: false,
    updateLabel: false,
    getContactsList: false,
    addNewContact: false,
    removeContact: false,
    getMailsList: false,
    updateMailsFolder: false,
    updateMailsLabel: false,
    updateFvrtStatus: false,
    updateReadStatus: false,
    updateImprtntStatus: false,
    composeMail: false,
    getSelectedMail: false,
    updateSelectedMail: false,
    replyToMail: false,
    nullifySelectedMail: false,
  },
  error: {
    isSideBarCollapsed: null,
    codeResult: null,
    searchEmails: null,
    setFilterType: null,
    getLabelsList: null,
    addNewLabel: null,
    deleteLabel: null,
    updateLabel: null,
    getContactsList: null,
    addNewContact: null,
    removeContact: null,
    getMailsList: null,
    updateMailsFolder: null,
    updateMailsLabel: null,
    updateFvrtStatus: null,
    updateReadStatus: null,
    updateImprtntStatus: null,
    composeMail: null,
    getSelectedMail: null,
    updateSelectedMail: null,
    replyToMail: null,
    nullifySelectedMail: null,
  },
};

const mailAppReducer = createSlice({
  name: "mailAppReducer",
  initialState,
  reducers: {
    toggleSidebarCollapsed: (state, action) => {
      state.isSideBarCollapsed =
        action.payload !== undefined
          ? action.payload
          : !state.isSideBarCollapsed;
    },
    setFilterType: (state, action) => {
      state.filterType = action.payload;
      state.selectedMail = null;
    },
    getLabelsListSuccess: (state, action) => {
      state.labelsList = action.payload;
    },
    addLabelSuccess: (state, action) => {
      state.labelsList.push(action.payload);
    },
    updateLabelItemSuccess: (state, action) => {
      state.labelsList = state.labelsList.map((item) =>
        item.id === action.payload.id ? action.payload : item,
      );
    },
    deleteLabelItemSuccess: (state, action) => {
      state.labelsList = state.labelsList.filter(
        (item) => item.id !== action.payload,
      );
    },
    getContactsListSuccess: (state, action) => {
      state.contactsList = action.payload;
    },
    addContactSuccess: (state, action) => {
      state.contactsList.push(action.payload);
    },
    removeContactSuccess: (state, action) => {
      state.contactsList = state.contactsList.filter(
        (contact) => contact.email !== action.payload.email,
      );
    },
    getMailsListSuccess: (state, action) => {
      state.mailsList = action.payload.list;
      state.totalMailCount = action.payload.total;
      state.selectedMail = null;
    },
    updateMailFolderSuccess: (state, action) => {
      const updatedList = state.mailsList.filter(
        (mail) => !action.payload.includes(mail.id),
      );
      state.mailsList = updatedList;
      state.totalMailCount = state.totalMailCount - action.payload.length;
    },
    updateMailLabelSuccess: (state, action) => {
      const mailIds = action.payload.map((mail) => mail.id);
      const updatedList = state.mailsList.map((mail) =>
        mailIds.includes(mail.id)
          ? action.payload.find((selectedMail) => selectedMail.id === mail.id)
          : mail,
      );
      state.mailsList = updatedList;
    },
    updateFavoriteStatusSuccess: (state, action) => {
      const { mailIds, status } = action.payload;
      state.mailsList = state.mailsList.map((mail) =>
        mailIds.includes(mail.id) ? { ...mail, favorite: status } : mail,
      );
    },
    updateReadStatusSuccess: (state, action) => {
      const { mailIds, status } = action.payload;
      state.mailsList = state.mailsList.map((mail) =>
        mailIds.includes(mail.id) ? { ...mail, read: status } : mail,
      );
    },
    updateImportantStatusSuccess: (state, action) => {
      const { mailIds, status } = action.payload;
      state.mailsList = state.mailsList.map((mail) =>
        mailIds.includes(mail.id) ? { ...mail, important: status } : mail,
      );
    },
    composeMailSuccess: (state, action) => {
      if (state.filterType.selectedFolder === "sent") {
        state.mailsList.unshift(action.payload);
        state.totalMailCount += 1;
      }
    },
    getSelectedMailSuccess: (state, action) => {
      state.selectedMail = action.payload;
      state.mailsList = [];
    },
    nullifySelectedMail: (state) => {
      state.selectedMail = null;
    },
    updateSelectedMailSuccess: (state, action) => {
      state.selectedMail =
        state.selectedMail.folder === action.payload.folder
          ? action.payload
          : null;
    },
    replyToMailSuccess: (state, action) => {
      state.selectedMail = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Async Thunk: toggleSidebarCollapsed
    builder
      .addCase(toggleSidebarCollapsedThunk.pending, (state) => {
        state.loading.isSideBarCollapsed = true;
        state.error.isSideBarCollapsed = null;
      })
      .addCase(toggleSidebarCollapsedThunk.fulfilled, (state, action) => {
        state.loading.isSideBarCollapsed = false;
        state.isSideBarCollapsed = action.payload;
      })
      .addCase(toggleSidebarCollapsedThunk.rejected, (state, action) => {
        state.loading.isSideBarCollapsed = false;
        state.error.isSideBarCollapsed = action.payload;
      });

    // Async Thunk: setFilterType
    builder
      .addCase(setFilterTypeThunk.pending, (state) => {
        state.loading.setFilterType = true;
        state.error.setFilterType = null;
      })
      .addCase(setFilterTypeThunk.fulfilled, (state, action) => {
        state.loading.setFilterType = false;
        state.filterType = action.payload;
        const filteredData = state.allMailList.filter((item) => {
          const itemObject = Object.assign({}, item);

          // Check if the outer "labels" array contains the desired label name
          const outerLabelMatch = itemObject.labels.some(
            (label) => label.name === action.payload.selectedFolder,
          );

          // Check if the "starred" field in the outer object is true
          const isOuterStarred =
            item.starred === true &&
            action.payload.selectedFilter === "starred";

          // Check if the "messages" property exists and has at least one message
          if (itemObject.messages && itemObject.messages.length > 0) {
            // Convert each message to a plain object
            itemObject.messages = itemObject.messages.map((message) =>
              Object.assign({}, message),
            );

            // Check if any message within the "messages" array has the desired label name
            const innerLabelMatch = itemObject.messages.some((message) => {
              const isInnerStarred =
                message.starred === true &&
                action.payload.selectedFilter === "starred";
              return (
                (message.labels &&
                  message.labels.some(
                    (label) => label.name === action.payload.selectedFolder,
                  )) ||
                isInnerStarred
              );
            });

            // Return true if either outer or inner labels match the desired label name
            return outerLabelMatch || innerLabelMatch || isOuterStarred;
          }

          // Return true if only outer labels match the desired label name
          return outerLabelMatch || isOuterStarred;
        });
        function paginateArray(array, page, pageSize) {
          const startIndex = page * pageSize;
          const endIndex = startIndex + pageSize;
          return array.slice(startIndex, endIndex);
        }
        const filteredArray = paginateArray(
          filteredData,
          state.filterType.page,
          10,
        );
        state.mailsList = filteredArray;
        state.selectedMail = null;
      })
      .addCase(setFilterTypeThunk.rejected, (state, action) => {
        state.loading.setFilterType = false;
        state.error.setFilterType = action.payload;
      });

    // Async Thunk: getLabelsList
    builder
      .addCase(getLabelsList.pending, (state) => {
        state.loading.getLabelsList = true;
        state.error.getLabelsList = null;
      })
      .addCase(getLabelsList.fulfilled, (state, action) => {
        state.loading.getLabelsList = false;
        // TODO: add all standard labels
        const standard_labels = [
          "promotions",
          "all",
          "drafts",
          "spam",
          "personal",
          "important",
          "updates",
          "social",
          "trash",
          "forums",
          "sent",
          "inbox",
        ];

        const filteredLabels = action.payload.filter(
          (label) => !standard_labels.includes(label.name),
        );
        state.labelsList = filteredLabels;
      })
      .addCase(getLabelsList.rejected, (state, action) => {
        state.loading.getLabelsList = false;
        state.error.getLabelsList = null;
      });

    // Async Thunk: addNewLabel
    builder
      .addCase(addNewLabel.pending, (state) => {
        state.loading.addNewLabel = true;
        state.error.addNewLabel = null;
      })
      .addCase(addNewLabel.fulfilled, (state, action) => {
        state.loading.addNewLabel = false;
        action.payload.display_name = action.payload.name;
        delete action.payload.name;
        state.labelsList.push(action.payload);
      })
      .addCase(addNewLabel.rejected, (state, action) => {
        state.loading.addNewLabel = false;
        state.error.addNewLabel = action.payload;
      });

    // Async Thunk: deleteLabel
    builder
      .addCase(deleteLabel.pending, (state) => {
        state.loading.deleteLabel = true;
        state.error.deleteLabel = null;
      })
      .addCase(deleteLabel.fulfilled, (state, action) => {
        state.loading.deleteLabel = false;
        state.labelsList = state.labelsList.filter(
          (item) => item.id !== action.payload,
        );
      })
      .addCase(deleteLabel.rejected, (state, action) => {
        state.loading.deleteLabel = false;
        state.error.deleteLabel = action.payload;
      });

    // Async Thunk: updateLabel
    builder
      .addCase(updateLabel.pending, (state) => {
        state.loading.updateLabel = true;
        state.error.updateLabel = null;
      })
      .addCase(updateLabel.fulfilled, (state, action) => {
        state.loading.updateLabel = false;
        state.labelsList = state.labelsList.map((item) =>
          item.id === action.payload.id ? action.payload : item,
        );
      })
      .addCase(updateLabel.rejected, (state, action) => {
        state.loading.updateLabel = false;
        state.error.updateLabel = action.payload;
      });

    // Async Thunk: getContactsList
    builder
      .addCase(getContactsList.pending, (state) => {
        state.loading.getContactsList = true;
        state.error.getContactsList = null;
      })
      .addCase(getContactsList.fulfilled, (state, action) => {
        state.loading.getContactsList = false;
        state.contactsList = action.payload;
      })
      .addCase(getContactsList.rejected, (state, action) => {
        state.loading.getContactsList = false;
        state.error.getContactsList = action.payload;
      });

    // Async Thunk: addNewContact
    builder
      .addCase(addNewContact.pending, (state) => {
        state.loading.addNewContact = true;
        state.error.addNewContact = null;
      })
      .addCase(addNewContact.fulfilled, (state, action) => {
        state.loading.addNewContact = false;
        state.contactsList.push(action.payload);
      })
      .addCase(addNewContact.rejected, (state, action) => {
        state.loading.addNewContact = false;
        state.error.addNewContact = action.payload;
      });

    // Async Thunk: removeContact
    builder
      .addCase(removeContact.pending, (state) => {
        state.loading.removeContact = true;
        state.error.removeContact = null;
      })
      .addCase(removeContact.fulfilled, (state, action) => {
        state.loading.removeContact = false;
        state.contactsList = state.contactsList.filter(
          (contact) => contact.email !== action.payload.email,
        );
      })
      .addCase(removeContact.rejected, (state, action) => {
        state.loading.removeContact = false;
        state.error.removeContact = action.payload;
      });

    // Async Thunk: getMailsList
    builder
      .addCase(getMailsList.pending, (state) => {
        state.loading.getMailsList = true;
        state.error.getMailsList = null;
      })
      .addCase(getMailsList.fulfilled, (state, action) => {
        state.loading.getMailsList = false;
        if (state.mailsList?.length === 0) {
          state.mailsList = action.payload;
        }
        state.allMailList = action.payload;
        state.totalMailCount = action.payload.length;
        state.selectedMail = null;
      })
      .addCase(getMailsList.rejected, (state, action) => {
        state.loading.getMailsList = false;
        state.error.getMailsList = action.payload;
      });

    // Async Thunk: updateMailsFolder
    builder
      .addCase(updateMailsFolder.pending, (state) => {
        state.loading.updateMailsFolder = true;
        state.error.updateMailsFolder = null;
      })
      .addCase(updateMailsFolder.fulfilled, (state, action) => {
        state.loading.updateMailsFolder = false;
        const updatedList = state.mailsList.filter(
          (mail) => !action.payload.includes(mail.id),
        );
        state.mailsList = updatedList;
        state.totalMailCount = state.totalMailCount - action.payload.length;
      })
      .addCase(updateMailsFolder.rejected, (state, action) => {
        state.loading.updateMailsFolder = false;
        state.error.updateMailsFolder = action.payload;
      });

    // Async Thunk: updateMailLabel
    builder
      .addCase(updateMailsLabel.pending, (state) => {
        state.loading.updateMailLabel = true;
        state.error.updateMailLabel = null;
      })
      .addCase(updateMailsLabel.fulfilled, (state, action) => {
        state.loading.updateMailLabel = false;
        const mailIds = action.payload.map((mail) => mail.id);
        const updatedList = state.mailsList.map((mail) =>
          mailIds.includes(mail.id)
            ? action.payload.find((selectedMail) => selectedMail.id === mail.id)
            : mail,
        );
        state.mailsList = updatedList;
      })
      .addCase(updateMailsLabel.rejected, (state, action) => {
        state.loading.updateMailLabel = false;
        state.error.updateMailLabel = action.payload;
      });

    // Async Thunk: updateFvrtStatus
    builder
      .addCase(updateFvrtStatus.pending, (state) => {
        state.loading.updateFavoriteStatus = true;
        state.error.updateFavoriteStatus = null;
      })
      .addCase(updateFvrtStatus.fulfilled, (state, action) => {
        state.loading.updateFavoriteStatus = false;
        const { mailIds, status } = action.payload;
        state.mailsList = state.mailsList.map((mail) =>
          mailIds.includes(mail.id) ? { ...mail, favorite: status } : mail,
        );
      })
      .addCase(updateFvrtStatus.rejected, (state, action) => {
        state.loading.updateFavoriteStatus = false;
        state.error.updateFavoriteStatus = action.payload;
      });

    // Async Thunk: updateReadStatus
    builder
      .addCase(updateReadStatus.pending, (state) => {
        state.loading.updateReadStatus = true;
        state.error.updateReadStatus = null;
      })
      .addCase(updateReadStatus.fulfilled, (state, action) => {
        state.loading.updateReadStatus = false;
        const { mailIds, status } = action.payload;
        state.mailsList = state.mailsList.map((mail) =>
          mailIds.includes(mail.id) ? { ...mail, read: status } : mail,
        );
      })
      .addCase(updateReadStatus.rejected, (state, action) => {
        state.loading.updateReadStatus = false;
        state.error.updateReadStatus = action.payload;
      });

    // Async Thunk: updateImportantStatus
    builder
      .addCase(updateImprtntStatus.pending, (state) => {
        state.loading.updateImportantStatus = true;
        state.error.updateImportantStatus = null;
      })
      .addCase(updateImprtntStatus.fulfilled, (state, action) => {
        state.loading.updateImportantStatus = false;
        const { mailIds, status } = action.payload;
        state.mailsList = state.mailsList.map((mail) =>
          mailIds.includes(mail.id) ? { ...mail, important: status } : mail,
        );
      })
      .addCase(updateImprtntStatus.rejected, (state, action) => {
        state.loading.updateImportantStatus = false;
        state.error.updateImportantStatus = action.payload;
      });

    // Async Thunk: composeMail
    builder
      .addCase(composeMail.pending, (state) => {
        state.loading.composeMail = true;
        state.error.composeMail = null;
      })
      .addCase(composeMail.fulfilled, (state, action) => {
        state.loading.composeMail = false;
        if (state.filterType.selectedFolder === "sent") {
          state.mailsList.unshift(action.payload);
          state.totalMailCount += 1;
        }
      })
      .addCase(composeMail.rejected, (state, action) => {
        state.loading.composeMail = false;
        state.error.composeMail = action.payload;
      });

    // Async Thunk: getSelectedMail
    builder
      .addCase(getSelectedMail.pending, (state) => {
        state.loading.getSelectedMail = true;
        state.error.getSelectedMail = null;
      })
      .addCase(getSelectedMail.fulfilled, (state, action) => {
        state.loading.getSelectedMail = false;
        state.selectedMail = action.payload;
        state.mailsList = [];
      })
      .addCase(getSelectedMail.rejected, (state, action) => {
        state.loading.getSelectedMail = false;
        state.error.getSelectedMail = action.payload;
      });

    // Async Thunk: nullifySelectedMail
    builder
      .addCase(nullifySelectedMailThunk.pending, (state) => {
        state.loading.nullifySelectedMail = true;
        state.error.nullifySelectedMail = null;
      })
      .addCase(nullifySelectedMailThunk.fulfilled, (state) => {
        state.loading.nullifySelectedMail = false;
        state.selectedMail = null;
      })
      .addCase(nullifySelectedMailThunk.rejected, (state, action) => {
        state.loading.nullifySelectedMail = false;
        state.error.nullifySelectedMail = action.payload;
      });

    // Async Thunk: updateSelectedMail
    builder
      .addCase(updateSelectedMail.pending, (state) => {
        state.loading.updateSelectedMail = true;
        state.error.updateSelectedMail = null;
      })
      .addCase(updateSelectedMail.fulfilled, (state, action) => {
        state.loading.updateSelectedMail = false;
        state.selectedMail =
          state.selectedMail.folder === action.payload.folder
            ? action.payload
            : null;
      })
      .addCase(updateSelectedMail.rejected, (state, action) => {
        state.loading.updateSelectedMail = false;
        state.error.updateSelectedMail = action.payload;
      });

    // Async Thunk: replyToMail
    builder
      .addCase(replyToMail.pending, (state) => {
        state.loading.replyToMail = true;
        state.error.replyToMail = null;
      })
      .addCase(replyToMail.fulfilled, (state, action) => {
        state.loading.replyToMail = false;
        state.selectedMail = action.payload;
      })
      .addCase(replyToMail.rejected, (state, action) => {
        state.loading.replyToMail = false;
        state.error.replyToMail = action.payload;
      });

    // Async Thunk: searchEmails
    builder
      .addCase(searchEmails.pending, (state) => {
        state.loading.searchEmails = true;
        state.error.searchEmails = null;
      })
      .addCase(searchEmails.fulfilled, (state, action) => {
        state.loading.searchEmails = false;
        if (action.payload?.length > 0) {
          state.mailsList = action.payload;
        }
      })
      .addCase(searchEmails.rejected, (state, action) => {
        state.loading.searchEmails = false;
        state.error.searchEmails = "Something went wrong!";
      });

    // Async Thunk: executeCode
    builder
      .addCase(executeCode.pending, (state) => {
        state.loading.codeResult = true;
        state.error.codeResult = null;
      })
      .addCase(executeCode.fulfilled, (state, action) => {
        state.loading.codeResult = false;
        if (action.payload) {
          state.codeResult = action.payload.stdout;
        }
      })
      .addCase(executeCode.rejected, (state, action) => {
        state.loading.codeResult = false;
        state.error.codeResult = "Something went wrong!";
      });
  },
});

export const {
  toggleSidebarCollapsed,
  setFilterType,
  getLabelsListSuccess,
  addLabelSuccess,
  updateLabelItemSuccess,
  deleteLabelItemSuccess,
  getContactsListSuccess,
  addContactSuccess,
  removeContactSuccess,
  getMailsListSuccess,
  updateMailFolderSuccess,
  updateMailLabelSuccess,
  updateFavoriteStatusSuccess,
  updateReadStatusSuccess,
  updateImportantStatusSuccess,
  composeMailSuccess,
  getSelectedMailSuccess,
  nullifySelectedMail,
  updateSelectedMailSuccess,
  replyToMailSuccess,
} = mailAppReducer.actions;

export default mailAppReducer.reducer;
