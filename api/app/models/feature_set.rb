class FeatureSet < ApplicationRecord
  def self.stats
    keys = FeatureSet.last.data.keys()
    hash = {}
    yes = {}
    no = {}
    keys.map do |k|
      hash[k] = FeatureSet.group("data #>> '{#{k}}'").count
      yes[k] = FeatureSet.where("data #>> '{treatment_required}' = 'Yes'").group("data #>> '{#{k}}'").count
      no[k] = FeatureSet.where("data #>> '{treatment_required}' = 'No'").group("data #>> '{#{k}}'").count
    end
    { hash: hash, yes: yes, no: no }
  end
end
