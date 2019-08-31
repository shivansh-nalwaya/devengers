from sklearn.metrics import precision_score, recall_score, confusion_matrix
from sklearn.linear_model import LogisticRegression
import numpy as np
import pandas as pd
import os
import sys
import sklearn
import matplotlib as mpl
import matplotlib.pyplot as plt
from sklearn.preprocessing import OneHotEncoder, OrdinalEncoder


class LogModel:
    def __init__(self):
        survey_path = os.path.join("./", "train_data_v2.csv")
        train_data = pd.read_csv(survey_path)
        train_data = train_data.drop("Unnamed: 0", axis=1)
        train_data = train_data.drop("index", axis=1)
        X_train_set = train_data.drop("treatment", axis=1)
        y_train_set = train_data["treatment"].copy()
        self.logreg_classifier = LogisticRegression()
        self.logreg_classifier.fit(X_train_set, y_train_set)

    def log_predict(self, data):
        prediction = self.logreg_classifier.predict(data)
        return prediction

    def data_encoder(self, data):
        mh_data = pd.DataFrame(data,columns=["Age","Gender","Country","state","self_employed","family_history","work_interfere","no_employees","remote_work","tech_company","benefits","care_options","wellness_program","seek_help","anonymity","leave","mental_health_consequence","phys_health_consequence","coworkers","supervisor","mental_health_interview","phys_health_interview","mental_vs_physical","obs_consequence"])
        mh_dataclean = mh_data
        print(mh_dataclean)
        mh_dataclean["self_employed"].isnull().value_counts()
        mh_dataclean[["self_employed"]] = mh_dataclean[[
            "self_employed"]].fillna("Don't know")

        mh_dataclean["work_interfere"].isnull().value_counts()
        mh_dataclean[["work_interfere"]] = mh_dataclean[[
            "work_interfere"]].fillna("Don't know")
        mh_dataclean["state"].isnull().value_counts()
        mh_dataclean[["state"]] = mh_dataclean[[
            "state"]].fillna("no state referred")

        mh_dataclean.loc[mh_dataclean["Age"] == -1, "Age"] = 33
        mh_dataclean.loc[mh_dataclean["Age"] == 11, "Age"] = 33
        # Cleaning up the male Gender
        # mh_dataclean["Gender"].value_counts()
        mh_dataclean.loc[mh_dataclean["Gender"] == "male", "Gender"] = "Male"
        mh_dataclean.loc[mh_dataclean["Gender"] == "M", "Gender"] = "Male"
        mh_dataclean.loc[mh_dataclean["Gender"] == "m", "Gender"] = "Male"
        mh_dataclean.loc[mh_dataclean["Gender"] == "Make", "Gender"] = "Male"
        mh_dataclean.loc[mh_dataclean["Gender"]
                         == "Cis Male", "Gender"] = "Male"
        mh_dataclean.loc[mh_dataclean["Gender"] == "Man", "Gender"] = "Male"
        mh_dataclean.loc[mh_dataclean["Gender"] ==
                         "ostensibly male, unsure what that really means", "Gender"] = "Male"
        mh_dataclean.loc[mh_dataclean["Gender"]
                         == "Male-ish", "Gender"] = "Male"
        mh_dataclean.loc[mh_dataclean["Gender"]
                         == "Cis Man", "Gender"] = "Male"
        mh_dataclean.loc[mh_dataclean["Gender"] == "msle", "Gender"] = "Male"
        mh_dataclean.loc[mh_dataclean["Gender"]
                         == "Male (CIS)", "Gender"] = "Male"
        mh_dataclean.loc[mh_dataclean["Gender"] == "Mal", "Gender"] = "Male"
        mh_dataclean.loc[mh_dataclean["Gender"] == "maile", "Gender"] = "Male"
        mh_dataclean.loc[mh_dataclean["Gender"] ==
                         "Guy (-ish) ^_^", "Gender"] = "Male"
        mh_dataclean.loc[mh_dataclean["Gender"] == "Mail", "Gender"] = "Male"
        mh_dataclean.loc[mh_dataclean["Gender"] ==
                         "male leaning androgynous", "Gender"] = "Male"
        mh_dataclean.loc[mh_dataclean["Gender"] == "Malr", "Gender"] = "Male"
        mh_dataclean.loc[mh_dataclean["Gender"]
                         == "cis male", "Gender"] = "Male"
        mh_dataclean.loc[mh_dataclean["Gender"] ==
                         "something kinda male?", "Gender"] = "Male"
        mh_dataclean.loc[mh_dataclean["Gender"] == "Male ", "Gender"] = "Male"
        mh_dataclean["Gender"].value_counts()
        # Cleaning up female gender
        mh_dataclean.loc[mh_dataclean["Gender"]
                         == "female", "Gender"] = "Female"
        mh_dataclean.loc[mh_dataclean["Gender"] == "F", "Gender"] = "Female"
        mh_dataclean.loc[mh_dataclean["Gender"] == "f", "Gender"] = "Female"
        mh_dataclean.loc[mh_dataclean["Gender"]
                         == "Woman", "Gender"] = "Female"
        mh_dataclean.loc[mh_dataclean["Gender"] ==
                         "Female (trans)", "Gender"] = "Female"
        mh_dataclean.loc[mh_dataclean["Gender"]
                         == "woman", "Gender"] = "Female"
        mh_dataclean.loc[mh_dataclean["Gender"] ==
                         "cis-female/femme", "Gender"] = "Female"
        mh_dataclean.loc[mh_dataclean["Gender"] ==
                         "Trans-female", "Gender"] = "Female"
        mh_dataclean.loc[mh_dataclean["Gender"]
                         == "Trans woman", "Gender"] = "Female"
        mh_dataclean.loc[mh_dataclean["Gender"]
                         == "Femake", "Gender"] = "Female"
        mh_dataclean.loc[mh_dataclean["Gender"]
                         == "femail", "Gender"] = "Female"
        mh_dataclean.loc[mh_dataclean["Gender"] ==
                         "Female (cis)", "Gender"] = "Female"
        mh_dataclean.loc[mh_dataclean["Gender"]
                         == "Cis Female", "Gender"] = "Female"
        mh_dataclean.loc[mh_dataclean["Gender"]
                         == "Female ", "Gender"] = "Female"
        mh_dataclean["Gender"].value_counts()
        mh_dataclean.loc[(mh_dataclean["Gender"] != "Male") & (
            mh_dataclean["Gender"] != "Female"), "Gender"] = "Other"

        # First lets encoded categorical features with ordina encoder.
        mh_dataclean_encoded = mh_dataclean
        # Encoding Country
        country_1h_encoder = OrdinalEncoder(categories=[["United States",
                                                         "United Kingdom",
                                                         "Canada",
                                                         "Germany",
                                                         "Netherlands",
                                                         "Australia",
                                                         "Ireland",
                                                         "France",
                                                         "India",
                                                         "Sweden",
                                                         "Switzerland",
                                                         "New Zealand",
                                                         "Poland",
                                                         "Italy",
                                                         "Belgium",
                                                         "South Africa",
                                                         "Brazil",
                                                         "Austria",
                                                         "Israel",
                                                         "Bulgaria",
                                                         "Russia",
                                                         "Mexico",
                                                         "Denmark",
                                                         "Finland",
                                                         "Singapore",
                                                         "Portugal",
                                                         "Spain",
                                                         "Japan",
                                                         "Slovenia",
                                                         "Costa Rica",
                                                         "Latvia",
                                                         "Hungary",
                                                         "Thailand",
                                                         "Croatia",
                                                         "Romania",
                                                         "Nigeria",
                                                         "Zimbabwe",
                                                         "Uruguay",
                                                         "Bosnia and Herzegovina",
                                                         "Colombia",
                                                         "Norway"]])
        mh_dataclean_encoded.Country = country_1h_encoder.fit_transform(
            mh_dataclean_encoded[["Country"]])
        #mh_dataclean_encoded=pd.DataFrame(country_cat_1hot, columns="Country")
        # Encoding state
        state_encoder = OrdinalEncoder(categories=[["CA",
                                                    "WA",
                                                    "NY",
                                                    "TX",
                                                    "TN",
                                                    "OR",
                                                    "PA",
                                                    "MA",
                                                    "IL",
                                                    "OH",
                                                    "MI",
                                                    "IN",
                                                    "MN",
                                                    "VA",
                                                    "MO",
                                                    "GA",
                                                    "FL",
                                                    "NC",
                                                    "WI",
                                                    "CO",
                                                    "MD",
                                                    "AZ",
                                                    "UT",
                                                    "KY",
                                                    "OK",
                                                    "AL",
                                                    "DC",
                                                    "IA",
                                                    "SC",
                                                    "NH",
                                                    "CT",
                                                    "NJ",
                                                    "NV",
                                                    "KS",
                                                    "NE",
                                                    "NM",
                                                    "WY",
                                                    "VT",
                                                    "SD",
                                                    "WV",
                                                    "RI",
                                                    "ID",
                                                    "MS",
                                                    "LA",
                                                    "ME",
                                                    "no state referred"]])
        mh_dataclean_encoded.state = state_encoder.fit_transform(
            mh_dataclean_encoded[["state"]])

        # Encoding work_interfere
        workinterfere_enconder = OrdinalEncoder(
            categories=[["Don't know", "Never", "Rarely", "Sometimes", "Often", "qwerty nansa"]])
        mh_dataclean_encoded["work_interfere"] = workinterfere_enconder.fit_transform(
            mh_dataclean_encoded[["work_interfere"]])

        # Encoding no_employees
        noemployees_encoder = OrdinalEncoder(
            categories=[["1-5", "6-25", "26-100", "100-500", "500-1000", "More than 1000"]])
        mh_dataclean_encoded["no_employees"] = noemployees_encoder.fit_transform(
            mh_dataclean_encoded[["no_employees"]])
        mh_dataclean_encoded["Gender"].value_counts()
        my_encoder = OrdinalEncoder(categories=[["Male", "Female", "Other"]])
        mh_dataclean_encoded["Gender"] = my_encoder.fit_transform(
            mh_dataclean_encoded[["Gender"]])
        mh_dataclean_encoded["Gender"].value_counts()
        mh_dataclean_encoded["self_employed"].value_counts()
        my_encoder = OrdinalEncoder(categories=[["Yes", "No", "Don't know"]])
        mh_dataclean_encoded["self_employed"] = my_encoder.fit_transform(
            mh_dataclean_encoded[["self_employed"]])
        mh_dataclean_encoded["self_employed"].value_counts()
        mh_dataclean_encoded["family_history"].value_counts()
        my_encoder = OrdinalEncoder(categories=[["Yes", "No"]])
        mh_dataclean_encoded["family_history"] = my_encoder.fit_transform(
            mh_dataclean_encoded[["family_history"]])
        mh_dataclean_encoded["family_history"].value_counts()
        mh_dataclean_encoded["remote_work"].value_counts()
        my_encoder = OrdinalEncoder(categories=[["Yes", "No"]])
        mh_dataclean_encoded["remote_work"] = my_encoder.fit_transform(
            mh_dataclean_encoded[["remote_work"]])
        mh_dataclean_encoded["remote_work"].value_counts()
        mh_dataclean_encoded["tech_company"].value_counts()
        my_encoder = OrdinalEncoder(categories=[["Yes", "No"]])
        mh_dataclean_encoded["tech_company"] = my_encoder.fit_transform(
            mh_dataclean_encoded[["tech_company"]])
        mh_dataclean_encoded["tech_company"].value_counts()
        mh_dataclean_encoded["benefits"].value_counts()
        my_encoder = OrdinalEncoder(categories=[["Yes", "No", "Don't know"]])
        mh_dataclean_encoded["benefits"] = my_encoder.fit_transform(
            mh_dataclean_encoded[["benefits"]])
        mh_dataclean_encoded["benefits"].value_counts()
        mh_dataclean_encoded["care_options"].value_counts()
        my_encoder = OrdinalEncoder(categories=[["Yes", "No", "Not sure"]])
        mh_dataclean_encoded["care_options"] = my_encoder.fit_transform(
            mh_dataclean_encoded[["care_options"]])
        mh_dataclean_encoded["care_options"].value_counts()
        mh_dataclean_encoded["wellness_program"].value_counts()
        my_encoder = OrdinalEncoder(categories=[["Yes", "No", "Don't know"]])
        mh_dataclean_encoded["wellness_program"] = my_encoder.fit_transform(
            mh_dataclean_encoded[["wellness_program"]])
        mh_dataclean_encoded["wellness_program"].value_counts()
        mh_dataclean_encoded["seek_help"].value_counts()
        my_encoder = OrdinalEncoder(categories=[["Yes", "No", "Don't know"]])
        mh_dataclean_encoded["seek_help"] = my_encoder.fit_transform(
            mh_dataclean_encoded[["seek_help"]])
        mh_dataclean_encoded["seek_help"].value_counts()
        mh_dataclean_encoded["anonymity"].value_counts()
        my_encoder = OrdinalEncoder(categories=[["Yes", "No", "Don't know"]])
        mh_dataclean_encoded["anonymity"] = my_encoder.fit_transform(
            mh_dataclean_encoded[["anonymity"]])
        mh_dataclean_encoded["anonymity"].value_counts()
        mh_dataclean_encoded["leave"].value_counts()
        my_encoder = OrdinalEncoder(categories=[
                                    ["Somewhat easy", "Very easy", "Don't know", "Somewhat difficult", "Very difficult"]])
        mh_dataclean_encoded["leave"] = my_encoder.fit_transform(
            mh_dataclean_encoded[["leave"]])
        mh_dataclean_encoded["leave"].value_counts()
        mh_dataclean_encoded["mental_health_consequence"].value_counts()
        my_encoder = OrdinalEncoder(categories=[["No", "Maybe", "Yes"]])
        mh_dataclean_encoded["mental_health_consequence"] = my_encoder.fit_transform(
            mh_dataclean_encoded[["mental_health_consequence"]])
        mh_dataclean_encoded["mental_health_consequence"].value_counts()
        mh_dataclean_encoded["phys_health_consequence"].value_counts()
        my_encoder = OrdinalEncoder(categories=[["No", "Maybe", "Yes"]])
        mh_dataclean_encoded["phys_health_consequence"] = my_encoder.fit_transform(
            mh_dataclean_encoded[["phys_health_consequence"]])
        mh_dataclean_encoded["phys_health_consequence"].value_counts()
        mh_dataclean_encoded["coworkers"].value_counts()
        my_encoder = OrdinalEncoder(categories=[["No", "Some of them", "Yes"]])
        mh_dataclean_encoded["coworkers"] = my_encoder.fit_transform(
            mh_dataclean_encoded[["coworkers"]])
        mh_dataclean_encoded["coworkers"].value_counts()
        mh_dataclean_encoded["supervisor"].value_counts()
        my_encoder = OrdinalEncoder(categories=[["No", "Some of them", "Yes"]])
        mh_dataclean_encoded["supervisor"] = my_encoder.fit_transform(
            mh_dataclean_encoded[["supervisor"]])
        mh_dataclean_encoded["supervisor"].value_counts()
        mh_dataclean_encoded["mental_health_interview"].value_counts()
        my_encoder = OrdinalEncoder(categories=[["No", "Maybe", "Yes"]])
        mh_dataclean_encoded["mental_health_interview"] = my_encoder.fit_transform(
            mh_dataclean_encoded[["mental_health_interview"]])
        mh_dataclean_encoded["mental_health_interview"].value_counts()
        mh_dataclean_encoded["phys_health_interview"].value_counts()
        my_encoder = OrdinalEncoder(categories=[["No", "Maybe", "Yes"]])
        mh_dataclean_encoded["phys_health_interview"] = my_encoder.fit_transform(
            mh_dataclean_encoded[["phys_health_interview"]])
        mh_dataclean_encoded["phys_health_interview"].value_counts()
        mh_dataclean_encoded["mental_vs_physical"].value_counts()
        my_encoder = OrdinalEncoder(categories=[["No", "Don't know", "Yes"]])
        mh_dataclean_encoded["mental_vs_physical"] = my_encoder.fit_transform(
            mh_dataclean_encoded[["mental_vs_physical"]])
        mh_dataclean_encoded["mental_vs_physical"].value_counts()
        mh_dataclean_encoded["obs_consequence"].value_counts()
        my_encoder = OrdinalEncoder(categories=[["No", "Yes"]])
        mh_dataclean_encoded["obs_consequence"] = my_encoder.fit_transform(
            mh_dataclean_encoded[["obs_consequence"]])
        mh_dataclean_encoded["obs_consequence"].value_counts()
        return mh_dataclean_encoded
