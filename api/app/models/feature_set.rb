class FeatureSet < ApplicationRecord
    def self.stats
        keys = FeatureSet.last.data.keys()
        hash = {}
        keys.map do |k|
            hash[k] = FeatureSet.group("data #>> '{#{k}}'").count
        end
        hash
    end
end
