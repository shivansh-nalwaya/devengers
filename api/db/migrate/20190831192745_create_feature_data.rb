class CreateFeatureData < ActiveRecord::Migration[5.2]
  def change
    create_table :feature_data do |t|
      t.jsonb :data

      t.timestamps
    end
  end
end
